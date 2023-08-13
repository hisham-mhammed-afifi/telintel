import * as lpn from 'google-libphonenumber';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryCode } from './data/country-code';
import { CountryISO } from './enums/country-iso.enum';
import { SearchCountryField } from './enums/search-country-field.enum';
import { TooltipLabel } from './enums/tooltip-label.enum';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
const ɵ0 = phoneNumberValidator;
export class NgxIntlTelInputComponent {
    constructor(countryCodeData) {
        this.countryCodeData = countryCodeData;
        this.value = '';
        this.preferredCountries = [];
        this.enablePlaceholder = true;
        this.cssClass = 'form-control';
        this.onlyCountries = [];
        this.enableAutoCountrySelect = true;
        this.searchCountryFlag = false;
        this.searchCountryField = [SearchCountryField.All];
        this.searchCountryPlaceholder = 'Search Country';
        this.maxLength = '';
        this.selectFirstCountry = true;
        this.phoneValidation = true;
        this.inputId = 'phone';
        this.separateDialCode = false;
        this.countryChange = new EventEmitter();
        this.selectedCountry = {
            areaCodes: undefined,
            dialCode: '',
            htmlId: '',
            flagClass: '',
            iso2: '',
            name: '',
            placeHolder: '',
            priority: 0,
        };
        this.phoneNumber = '';
        this.allCountries = [];
        this.preferredCountriesInDropDown = [];
        // Has to be 'any' to prevent a need to install @types/google-libphonenumber by the package user...
        this.phoneUtil = lpn.PhoneNumberUtil.getInstance();
        this.disabled = false;
        this.errors = ['Phone number is required.'];
        this.countrySearchText = '';
        this.onTouched = () => { };
        this.propagateChange = (_) => { };
    }
    ngOnInit() {
        this.init();
    }
    ngOnChanges(changes) {
        const selectedISO = changes['selectedCountryISO'];
        if (this.allCountries &&
            selectedISO &&
            selectedISO.currentValue !== selectedISO.previousValue) {
            this.getSelectedCountry();
        }
        if (changes.preferredCountries) {
            this.getPreferredCountries();
        }
        this.checkSeparateDialCodeStyle();
    }
    /*
        This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
        Ref: http://codelyzer.com/rules/no-life-cycle-call/
    */
    init() {
        this.fetchCountryData();
        if (this.preferredCountries.length) {
            this.getPreferredCountries();
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter((c) => this.onlyCountries.includes(c.iso2));
        }
        if (this.selectFirstCountry) {
            if (this.preferredCountriesInDropDown.length) {
                this.setSelectedCountry(this.preferredCountriesInDropDown[0]);
            }
            else {
                this.setSelectedCountry(this.allCountries[0]);
            }
        }
        this.getSelectedCountry();
        this.checkSeparateDialCodeStyle();
    }
    getPreferredCountries() {
        if (this.preferredCountries.length) {
            this.preferredCountriesInDropDown = [];
            this.preferredCountries.forEach((iso2) => {
                const preferredCountry = this.allCountries.filter((c) => {
                    return c.iso2 === iso2;
                });
                this.preferredCountriesInDropDown.push(preferredCountry[0]);
            });
        }
    }
    getSelectedCountry() {
        if (this.selectedCountryISO) {
            this.selectedCountry = this.allCountries.find((c) => {
                return c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase();
            });
            if (this.selectedCountry) {
                if (this.phoneNumber) {
                    this.onPhoneNumberChange();
                }
                else {
                    // Reason: avoid https://stackoverflow.com/a/54358133/1617590
                    // tslint:disable-next-line: no-null-keyword
                    this.propagateChange(null);
                }
            }
        }
    }
    setSelectedCountry(country) {
        this.selectedCountry = country;
        this.countryChange.emit(country);
    }
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     */
    searchCountry() {
        if (!this.countrySearchText) {
            this.countryList.nativeElement
                .querySelector('.iti__country-list li')
                .scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            });
            return;
        }
        const countrySearchTextLower = this.countrySearchText.toLowerCase();
        const country = this.allCountries.filter((c) => {
            if (this.searchCountryField.indexOf(SearchCountryField.All) > -1) {
                // Search in all fields
                if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.dialCode.startsWith(this.countrySearchText)) {
                    return c;
                }
            }
            else {
                // Or search by specific SearchCountryField(s)
                if (this.searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
                    if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (this.searchCountryField.indexOf(SearchCountryField.Name) > -1) {
                    if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (this.searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
                    if (c.dialCode.startsWith(this.countrySearchText)) {
                        return c;
                    }
                }
            }
        });
        if (country.length > 0) {
            const el = this.countryList.nativeElement.querySelector('#' + country[0].htmlId);
            if (el) {
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'nearest',
                });
            }
        }
        this.checkSeparateDialCodeStyle();
    }
    onPhoneNumberChange() {
        let countryCode;
        // Handle the case where the user sets the value programatically based on a persisted ChangeData obj.
        if (this.phoneNumber && typeof this.phoneNumber === 'object') {
            const numberObj = this.phoneNumber;
            this.phoneNumber = numberObj.number;
            countryCode = numberObj.countryCode;
        }
        this.value = this.phoneNumber;
        countryCode = countryCode || this.selectedCountry.iso2.toUpperCase();
        let number;
        try {
            number = this.phoneUtil.parse(this.phoneNumber, countryCode);
        }
        catch (e) { }
        // auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            countryCode =
                number && number.getCountryCode()
                    ? this.getCountryIsoCode(number.getCountryCode(), number)
                    : this.selectedCountry.iso2;
            if (countryCode && countryCode !== this.selectedCountry.iso2) {
                const newCountry = this.allCountries.sort((a, b) => {
                    return a.priority - b.priority;
                }).find((c) => c.iso2 === countryCode);
                if (newCountry) {
                    this.selectedCountry = newCountry;
                }
            }
        }
        countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
        this.checkSeparateDialCodeStyle();
        if (!this.value) {
            // Reason: avoid https://stackoverflow.com/a/54358133/1617590
            // tslint:disable-next-line: no-null-keyword
            this.propagateChange(null);
        }
        else {
            const intlNo = number
                ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL)
                : '';
            // parse phoneNumber if separate dial code is needed
            if (this.separateDialCode && intlNo) {
                this.value = this.removeDialCode(intlNo);
            }
            this.propagateChange({
                number: this.value,
                internationalNumber: intlNo,
                nationalNumber: number
                    ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL)
                    : '',
                e164Number: number
                    ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.E164)
                    : '',
                countryCode: countryCode.toUpperCase(),
                dialCode: '+' + this.selectedCountry.dialCode,
            });
        }
    }
    onCountrySelect(country, el) {
        this.setSelectedCountry(country);
        this.checkSeparateDialCodeStyle();
        if (this.phoneNumber && this.phoneNumber.length > 0) {
            this.value = this.phoneNumber;
            let number;
            try {
                number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
            }
            catch (e) { }
            const intlNo = number
                ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL)
                : '';
            // parse phoneNumber if separate dial code is needed
            if (this.separateDialCode && intlNo) {
                this.value = this.removeDialCode(intlNo);
            }
            this.propagateChange({
                number: this.value,
                internationalNumber: intlNo,
                nationalNumber: number
                    ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL)
                    : '',
                e164Number: number
                    ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.E164)
                    : '',
                countryCode: this.selectedCountry.iso2.toUpperCase(),
                dialCode: '+' + this.selectedCountry.dialCode,
            });
        }
        else {
            // Reason: avoid https://stackoverflow.com/a/54358133/1617590
            // tslint:disable-next-line: no-null-keyword
            this.propagateChange(null);
        }
        el.focus();
    }
    onInputKeyPress(event) {
        const allowedChars = /[0-9\+\-\ ]/;
        const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
        const allowedOtherKeys = [
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown',
            'Home',
            'End',
            'Insert',
            'Delete',
            'Backspace',
        ];
        if (!allowedChars.test(event.key) &&
            !(event.ctrlKey && allowedCtrlChars.test(event.key)) &&
            !allowedOtherKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
    fetchCountryData() {
        /* Clearing the list to avoid duplicates (https://github.com/webcat12345/ngx-intl-tel-input/issues/248) */
        this.allCountries = [];
        this.countryCodeData.allCountries.forEach((c) => {
            const country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: c[4] || undefined,
                htmlId: `iti-0__item-${c[1].toString()}`,
                flagClass: `iti__${c[1].toString().toLocaleLowerCase()}`,
                placeHolder: '',
            };
            if (this.enablePlaceholder) {
                country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            this.allCountries.push(country);
        });
    }
    getPhoneNumberPlaceHolder(countryCode) {
        try {
            return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
        }
        catch (e) {
            return e;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        if (obj === undefined) {
            this.init();
        }
        this.phoneNumber = obj;
        setTimeout(() => {
            this.onPhoneNumberChange();
        }, 1);
    }
    getCountryIsoCode(countryCode, number) {
        // Will use this to match area code from the first numbers
        const rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        const countries = this.allCountries.filter((c) => c.dialCode === countryCode.toString());
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        const mainCountry = countries.find((c) => c.areaCodes === undefined);
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        const secondaryCountries = countries.filter((c) => c.areaCodes !== undefined);
        let matchedCountry = mainCountry ? mainCountry.iso2 : undefined;
        /*
            Iterate over each secondary country and check if nationalNumber starts with any of areaCodes available.
            If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach((country) => {
            country.areaCodes.forEach((areaCode) => {
                if (rawNumber.startsWith(areaCode)) {
                    matchedCountry = country.iso2;
                }
            });
        });
        return matchedCountry;
    }
    separateDialCodePlaceHolder(placeholder) {
        return this.removeDialCode(placeholder);
    }
    removeDialCode(phoneNumber) {
        if (this.separateDialCode && phoneNumber) {
            phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
        }
        return phoneNumber;
    }
    // adjust input alignment
    checkSeparateDialCodeStyle() {
        if (this.separateDialCode && this.selectedCountry) {
            const cntryCd = this.selectedCountry.dialCode;
            this.separateDialCodeClass =
                'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
        }
        else {
            this.separateDialCodeClass = '';
        }
    }
}
NgxIntlTelInputComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ngx-intl-tel-input',
                template: "<div class=\"iti iti--allow-dropdown\"\n\t[ngClass]=\"separateDialCodeClass\">\n\t<div class=\"iti__flag-container\"\n\t\tdropdown\n\t\t[ngClass]=\"{'disabled': disabled}\"\n\t\t[isDisabled]=\"disabled\">\n\t\t<div class=\"iti__selected-flag dropdown-toggle\"\n\t\t\tdropdownToggle>\n\t\t\t<div class=\"iti__flag\"\n\t\t\t\t[ngClass]=\"selectedCountry?.flagClass\"\n\t\t\t\t[tooltip]=\"selectedCountry ? selectedCountry[tooltipField] : ''\"></div>\n\t\t\t<div *ngIf=\"separateDialCode\"\n\t\t\t\tclass=\"selected-dial-code\">+{{selectedCountry.dialCode}}</div>\n\t\t\t<div class=\"iti__arrow\"></div>\n\t\t</div>\n\t\t<div *dropdownMenu\n\t\t\tclass=\"dropdown-menu country-dropdown\">\n\t\t\t<div class=\"search-container\"\n\t\t\t\t*ngIf=\"searchCountryFlag && searchCountryField\">\n\t\t\t\t<input id=\"country-search-box\"\n\t\t\t\t\t[(ngModel)]=\"countrySearchText\"\n\t\t\t\t\t(keyup)=\"searchCountry()\"\n\t\t\t\t\t(click)=\"$event.stopPropagation()\"\n\t\t\t\t\t[placeholder]=\"searchCountryPlaceholder\"\n\t\t\t\t\tautofocus>\n\t\t\t</div>\n\t\t\t<ul class=\"iti__country-list\"\n\t\t\t\t#countryList>\n\t\t\t\t<li class=\"iti__country iti__preferred\"\n\t\t\t\t\t*ngFor=\"let country of preferredCountriesInDropDown\"\n\t\t\t\t\t(click)=\"onCountrySelect(country, focusable)\"\n\t\t\t\t\t[id]=\"country.htmlId+'-preferred'\">\n\t\t\t\t\t<div class=\"iti__flag-box\">\n\t\t\t\t\t\t<div class=\"iti__flag\"\n\t\t\t\t\t\t\t[ngClass]=\"country.flagClass\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"iti__country-name\">{{country.name}}</span>\n\t\t\t\t\t<span class=\"iti__dial-code\">+{{country.dialCode}}</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"iti__divider\"\n\t\t\t\t\t*ngIf=\"preferredCountriesInDropDown?.length\"></li>\n\t\t\t\t<li class=\"iti__country iti__standard\"\n\t\t\t\t\t*ngFor=\"let country of allCountries\"\n\t\t\t\t\t(click)=\"onCountrySelect(country, focusable)\"\n\t\t\t\t\t[id]=\"country.htmlId\">\n\t\t\t\t\t<div class=\"iti__flag-box\">\n\t\t\t\t\t\t<div class=\"iti__flag\"\n\t\t\t\t\t\t\t[ngClass]=\"country.flagClass\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"iti__country-name\">{{country.name}}</span>\n\t\t\t\t\t<span class=\"iti__dial-code\">+{{country.dialCode}}</span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t<input type=\"tel\"\n\t\t[id]=\"inputId\"\n\t\tautocomplete=\"off\"\n\t\t[ngClass]=\"cssClass\"\n\t\t(blur)=\"onTouched()\"\n\t\t(keypress)=\"onInputKeyPress($event)\"\n\t\t[(ngModel)]=\"phoneNumber\"\n\t\t(ngModelChange)=\"onPhoneNumberChange()\"\n\t\t[disabled]=\"disabled\"\n\t\t[placeholder]=\"separateDialCodePlaceHolder(selectedCountry?.placeHolder || '')\"\n\t\t[attr.maxLength]=\"maxLength\"\n\t\t[attr.validation]=\"phoneValidation\"\n\t\t#focusable>\n</div>",
                providers: [
                    CountryCode,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => NgxIntlTelInputComponent),
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useValue: ɵ0,
                        multi: true,
                    },
                ],
                styles: ["li.iti__country:hover{background-color:rgba(0,0,0,.05)}.iti__selected-flag.dropdown-toggle:after{content:none}.iti__flag-container.disabled{cursor:default!important}.iti.iti--allow-dropdown .flag-container.disabled:hover .iti__selected-flag{background:none}.country-dropdown{border:1px solid #ccc;border-collapse:collapse;padding:1px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.search-container{position:relative}.search-container input{border:none;border-bottom:1px solid #ccc;padding-left:10px;width:100%}.search-icon{margin:1px 10px;position:absolute;width:25px;z-index:2}.iti__country-list{border:none;position:relative}.iti input#country-search-box{padding-left:6px}.iti .selected-dial-code{margin-left:6px}.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2 .iti__selected-flag,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3 .iti__selected-flag,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4 .iti__selected-flag,.iti.separate-dial-code .iti__selected-flag{width:93px}.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2 input,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3 input,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4 input,.iti.separate-dial-code input{padding-left:98px}"]
            },] }
];
NgxIntlTelInputComponent.ctorParameters = () => [
    { type: CountryCode }
];
NgxIntlTelInputComponent.propDecorators = {
    value: [{ type: Input }],
    preferredCountries: [{ type: Input }],
    enablePlaceholder: [{ type: Input }],
    cssClass: [{ type: Input }],
    onlyCountries: [{ type: Input }],
    enableAutoCountrySelect: [{ type: Input }],
    searchCountryFlag: [{ type: Input }],
    searchCountryField: [{ type: Input }],
    searchCountryPlaceholder: [{ type: Input }],
    maxLength: [{ type: Input }],
    tooltipField: [{ type: Input }],
    selectFirstCountry: [{ type: Input }],
    selectedCountryISO: [{ type: Input }],
    phoneValidation: [{ type: Input }],
    inputId: [{ type: Input }],
    separateDialCode: [{ type: Input }],
    countryChange: [{ type: Output }],
    countryList: [{ type: ViewChild, args: ['countryList',] }]
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEdBQUcsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztXQWlCekQsb0JBQW9CO0FBS2pDLE1BQU0sT0FBTyx3QkFBd0I7SUE4Q3BDLFlBQW9CLGVBQTRCO1FBQTVCLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBN0N2QyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsdUJBQWtCLEdBQWtCLEVBQUUsQ0FBQztRQUN2QyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFHLGNBQWMsQ0FBQztRQUMxQixrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsNEJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix1QkFBa0IsR0FBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRSw2QkFBd0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUM1QyxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWYsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRTFCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFlBQU8sR0FBRyxPQUFPLENBQUM7UUFDbEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBR2Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRS9ELG9CQUFlLEdBQVk7WUFDMUIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFdBQVcsRUFBRSxFQUFFO1lBQ2YsUUFBUSxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRUYsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsaUJBQVksR0FBbUIsRUFBRSxDQUFDO1FBQ2xDLGlDQUE0QixHQUFtQixFQUFFLENBQUM7UUFDbEQsbUdBQW1HO1FBQ25HLGNBQVMsR0FBUSxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25ELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsV0FBTSxHQUFlLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNuRCxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFJdkIsY0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNyQixvQkFBZSxHQUFHLENBQUMsQ0FBYSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFVyxDQUFDO0lBRXBELFFBQVE7UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xELElBQ0MsSUFBSSxDQUFDLFlBQVk7WUFDakIsV0FBVztZQUNYLFdBQVcsQ0FBQyxZQUFZLEtBQUssV0FBVyxDQUFDLGFBQWEsRUFDckQ7WUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMxQjtRQUNELElBQUksT0FBTyxDQUFDLGtCQUFrQixFQUFFO1lBQy9CLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7TUFHRTtJQUNGLElBQUk7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxxQkFBcUI7UUFDcEIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFO1lBQ25DLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN4QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3ZELE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkUsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDckIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQzNCO3FCQUFNO29CQUNOLDZEQUE2RDtvQkFDN0QsNENBQTRDO29CQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjthQUNEO1NBQ0Q7SUFDRixDQUFDO0lBRUQsa0JBQWtCLENBQUMsT0FBZ0I7UUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhO2lCQUM1QixhQUFhLENBQUMsdUJBQXVCLENBQUM7aUJBQ3RDLGNBQWMsQ0FBQztnQkFDZixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE1BQU0sRUFBRSxTQUFTO2FBQ2pCLENBQUMsQ0FBQztZQUNKLE9BQU87U0FDUDtRQUNELE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNqRSx1QkFBdUI7Z0JBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRTtvQkFDNUQsT0FBTyxDQUFDLENBQUM7aUJBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO29CQUM1RCxPQUFPLENBQUMsQ0FBQztpQkFDVDtnQkFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO29CQUNsRCxPQUFPLENBQUMsQ0FBQztpQkFDVDthQUNEO2lCQUFNO2dCQUNOLDhDQUE4QztnQkFDOUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNsRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7d0JBQzVELE9BQU8sQ0FBQyxDQUFDO3FCQUNUO2lCQUNEO2dCQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDbEUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO3dCQUM1RCxPQUFPLENBQUMsQ0FBQztxQkFDVDtpQkFDRDtnQkFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3RFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7d0JBQ2xELE9BQU8sQ0FBQyxDQUFDO3FCQUNUO2lCQUNEO2FBQ0Q7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUN0RCxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDdkIsQ0FBQztZQUNGLElBQUksRUFBRSxFQUFFO2dCQUNQLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQ2pCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixLQUFLLEVBQUUsU0FBUztvQkFDaEIsTUFBTSxFQUFFLFNBQVM7aUJBQ2pCLENBQUMsQ0FBQzthQUNIO1NBQ0Q7UUFFRCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sbUJBQW1CO1FBQ3pCLElBQUksV0FBK0IsQ0FBQztRQUNwQyxxR0FBcUc7UUFDckcsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDN0QsTUFBTSxTQUFTLEdBQWUsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDcEMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDOUIsV0FBVyxHQUFHLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRSxJQUFJLE1BQXVCLENBQUM7UUFDNUIsSUFBSTtZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQzdEO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLHVIQUF1SDtRQUN2SCxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxXQUFXO2dCQUNWLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO29CQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLENBQUM7b0JBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUM5QixJQUFJLFdBQVcsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUU7Z0JBQzdELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNsRCxPQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNOLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FDN0IsQ0FBQztnQkFDRixJQUFJLFVBQVUsRUFBRTtvQkFDZixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztpQkFDbEM7YUFDRDtTQUNEO1FBQ0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUVwRSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQiw2REFBNkQ7WUFDN0QsNENBQTRDO1lBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNOLE1BQU0sTUFBTSxHQUFHLE1BQU07Z0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVOLG9EQUFvRDtZQUNwRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxNQUFNLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QztZQUVELElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDbEIsbUJBQW1CLEVBQUUsTUFBTTtnQkFDM0IsY0FBYyxFQUFFLE1BQU07b0JBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztvQkFDL0QsQ0FBQyxDQUFDLEVBQUU7Z0JBQ0wsVUFBVSxFQUFFLE1BQU07b0JBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztvQkFDM0QsQ0FBQyxDQUFDLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RDLFFBQVEsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRO2FBQzdDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVNLGVBQWUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7UUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBRWxDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRTlCLElBQUksTUFBdUIsQ0FBQztZQUM1QixJQUFJO2dCQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FDNUIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQ3ZDLENBQUM7YUFDRjtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFFZCxNQUFNLE1BQU0sR0FBRyxNQUFNO2dCQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFTixvREFBb0Q7WUFDcEQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksTUFBTSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekM7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2xCLG1CQUFtQixFQUFFLE1BQU07Z0JBQzNCLGNBQWMsRUFBRSxNQUFNO29CQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxFQUFFO2dCQUNMLFVBQVUsRUFBRSxNQUFNO29CQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7b0JBQzNELENBQUMsQ0FBQyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BELFFBQVEsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRO2FBQzdDLENBQUMsQ0FBQztTQUNIO2FBQU07WUFDTiw2REFBNkQ7WUFDN0QsNENBQTRDO1lBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFFRCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU0sZUFBZSxDQUFDLEtBQW9CO1FBQzFDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQjtRQUN6RCxNQUFNLGdCQUFnQixHQUFHO1lBQ3hCLFdBQVc7WUFDWCxTQUFTO1lBQ1QsWUFBWTtZQUNaLFdBQVc7WUFDWCxNQUFNO1lBQ04sS0FBSztZQUNMLFFBQVE7WUFDUixRQUFRO1lBQ1IsV0FBVztTQUNYLENBQUM7UUFFRixJQUNDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNwQztZQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjtJQUNGLENBQUM7SUFFUyxnQkFBZ0I7UUFDekIsMEdBQTBHO1FBQzFHLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQy9DLE1BQU0sT0FBTyxHQUFZO2dCQUN4QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUN6QixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEIsU0FBUyxFQUFHLENBQUMsQ0FBQyxDQUFDLENBQWMsSUFBSSxTQUFTO2dCQUMxQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3hDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN4RCxXQUFXLEVBQUUsRUFBRTthQUNmLENBQUM7WUFFRixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQzFCLENBQUM7YUFDRjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVTLHlCQUF5QixDQUFDLFdBQW1CO1FBQ3RELElBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUM1QyxHQUFHLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUNuQyxDQUFDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNYLE9BQU8sQ0FBQyxDQUFDO1NBQ1Q7SUFDRixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFRO1FBQ2xCLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM1QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8saUJBQWlCLENBQ3hCLFdBQW1CLEVBQ25CLE1BQXVCO1FBRXZCLDBEQUEwRDtRQUMxRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsNkdBQTZHO1FBQzdHLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN6QyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQzVDLENBQUM7UUFDRix5RkFBeUY7UUFDekYsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUNyRSxpR0FBaUc7UUFDakcsTUFBTSxrQkFBa0IsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUMxQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQ2hDLENBQUM7UUFDRixJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVoRTs7O1VBR0U7UUFDRixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ25DLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUM5QjtZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGNBQWMsQ0FBQztJQUN2QixDQUFDO0lBRUQsMkJBQTJCLENBQUMsV0FBbUI7UUFDOUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTyxjQUFjLENBQUMsV0FBbUI7UUFDekMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksV0FBVyxFQUFFO1lBQ3pDLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUQseUJBQXlCO0lBQ2pCLDBCQUEwQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQUksQ0FBQyxxQkFBcUI7Z0JBQ3pCLDZCQUE2QixHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ04sSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztTQUNoQztJQUNGLENBQUM7OztZQTFjRCxTQUFTLFNBQUM7Z0JBQ1YsK0NBQStDO2dCQUMvQyxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qix3c0ZBQWtEO2dCQUVsRCxTQUFTLEVBQUU7b0JBQ1YsV0FBVztvQkFDWDt3QkFDQyxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQiwwQ0FBMEM7d0JBQzFDLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUM7d0JBQ3ZELEtBQUssRUFBRSxJQUFJO3FCQUNYO29CQUNEO3dCQUNDLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixRQUFRLElBQXNCO3dCQUM5QixLQUFLLEVBQUUsSUFBSTtxQkFDWDtpQkFDRDs7YUFDRDs7O1lBM0JRLFdBQVc7OztvQkE2QmxCLEtBQUs7aUNBQ0wsS0FBSztnQ0FDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSztzQ0FDTCxLQUFLO2dDQUNMLEtBQUs7aUNBQ0wsS0FBSzt1Q0FDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSztpQ0FDTCxLQUFLO2lDQUNMLEtBQUs7OEJBQ0wsS0FBSztzQkFDTCxLQUFLOytCQUNMLEtBQUs7NEJBR0wsTUFBTTswQkFzQk4sU0FBUyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBscG4gZnJvbSAnZ29vZ2xlLWxpYnBob25lbnVtYmVyJztcblxuaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRFbGVtZW50UmVmLFxuXHRFdmVudEVtaXR0ZXIsXG5cdGZvcndhcmRSZWYsXG5cdElucHV0LFxuXHRPbkNoYW5nZXMsXG5cdE9uSW5pdCxcblx0T3V0cHV0LFxuXHRTaW1wbGVDaGFuZ2VzLFxuXHRWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvdW50cnlDb2RlIH0gZnJvbSAnLi9kYXRhL2NvdW50cnktY29kZSc7XG5pbXBvcnQgeyBDb3VudHJ5SVNPIH0gZnJvbSAnLi9lbnVtcy9jb3VudHJ5LWlzby5lbnVtJztcbmltcG9ydCB7IFNlYXJjaENvdW50cnlGaWVsZCB9IGZyb20gJy4vZW51bXMvc2VhcmNoLWNvdW50cnktZmllbGQuZW51bSc7XG5pbXBvcnQgeyBUb29sdGlwTGFiZWwgfSBmcm9tICcuL2VudW1zL3Rvb2x0aXAtbGFiZWwuZW51bSc7XG5pbXBvcnQgdHlwZSB7IENoYW5nZURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvY2hhbmdlLWRhdGEnO1xuaW1wb3J0IHR5cGUgeyBDb3VudHJ5IH0gZnJvbSAnLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcbmltcG9ydCB7IHBob25lTnVtYmVyVmFsaWRhdG9yIH0gZnJvbSAnLi9uZ3gtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yJztcblxuQENvbXBvbmVudCh7XG5cdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG5cdHNlbGVjdG9yOiAnbmd4LWludGwtdGVsLWlucHV0Jyxcblx0dGVtcGxhdGVVcmw6ICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuY3NzJ10sXG5cdHByb3ZpZGVyczogW1xuXHRcdENvdW50cnlDb2RlLFxuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQpLFxuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuXHRcdFx0dXNlVmFsdWU6IHBob25lTnVtYmVyVmFsaWRhdG9yLFxuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0fSxcblx0XSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXHRASW5wdXQoKSB2YWx1ZSA9ICcnO1xuXHRASW5wdXQoKSBwcmVmZXJyZWRDb3VudHJpZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblx0QElucHV0KCkgZW5hYmxlUGxhY2Vob2xkZXIgPSB0cnVlO1xuXHRASW5wdXQoKSBjc3NDbGFzcyA9ICdmb3JtLWNvbnRyb2wnO1xuXHRASW5wdXQoKSBvbmx5Q291bnRyaWVzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cdEBJbnB1dCgpIGVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0ID0gdHJ1ZTtcblx0QElucHV0KCkgc2VhcmNoQ291bnRyeUZsYWcgPSBmYWxzZTtcblx0QElucHV0KCkgc2VhcmNoQ291bnRyeUZpZWxkOiBTZWFyY2hDb3VudHJ5RmllbGRbXSA9IFtTZWFyY2hDb3VudHJ5RmllbGQuQWxsXTtcblx0QElucHV0KCkgc2VhcmNoQ291bnRyeVBsYWNlaG9sZGVyID0gJ1NlYXJjaCBDb3VudHJ5Jztcblx0QElucHV0KCkgbWF4TGVuZ3RoID0gJyc7XG5cdEBJbnB1dCgpIHRvb2x0aXBGaWVsZDogVG9vbHRpcExhYmVsO1xuXHRASW5wdXQoKSBzZWxlY3RGaXJzdENvdW50cnkgPSB0cnVlO1xuXHRASW5wdXQoKSBzZWxlY3RlZENvdW50cnlJU086IENvdW50cnlJU087XG5cdEBJbnB1dCgpIHBob25lVmFsaWRhdGlvbiA9IHRydWU7XG5cdEBJbnB1dCgpIGlucHV0SWQgPSAncGhvbmUnO1xuXHRASW5wdXQoKSBzZXBhcmF0ZURpYWxDb2RlID0gZmFsc2U7XG5cdHNlcGFyYXRlRGlhbENvZGVDbGFzczogc3RyaW5nO1xuXG5cdEBPdXRwdXQoKSByZWFkb25seSBjb3VudHJ5Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDb3VudHJ5PigpO1xuXG5cdHNlbGVjdGVkQ291bnRyeTogQ291bnRyeSA9IHtcblx0XHRhcmVhQ29kZXM6IHVuZGVmaW5lZCxcblx0XHRkaWFsQ29kZTogJycsXG5cdFx0aHRtbElkOiAnJyxcblx0XHRmbGFnQ2xhc3M6ICcnLFxuXHRcdGlzbzI6ICcnLFxuXHRcdG5hbWU6ICcnLFxuXHRcdHBsYWNlSG9sZGVyOiAnJyxcblx0XHRwcmlvcml0eTogMCxcblx0fTtcblxuXHRwaG9uZU51bWJlciA9ICcnO1xuXHRhbGxDb3VudHJpZXM6IEFycmF5PENvdW50cnk+ID0gW107XG5cdHByZWZlcnJlZENvdW50cmllc0luRHJvcERvd246IEFycmF5PENvdW50cnk+ID0gW107XG5cdC8vIEhhcyB0byBiZSAnYW55JyB0byBwcmV2ZW50IGEgbmVlZCB0byBpbnN0YWxsIEB0eXBlcy9nb29nbGUtbGlicGhvbmVudW1iZXIgYnkgdGhlIHBhY2thZ2UgdXNlci4uLlxuXHRwaG9uZVV0aWw6IGFueSA9IGxwbi5QaG9uZU51bWJlclV0aWwuZ2V0SW5zdGFuY2UoKTtcblx0ZGlzYWJsZWQgPSBmYWxzZTtcblx0ZXJyb3JzOiBBcnJheTxhbnk+ID0gWydQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWQuJ107XG5cdGNvdW50cnlTZWFyY2hUZXh0ID0gJyc7XG5cblx0QFZpZXdDaGlsZCgnY291bnRyeUxpc3QnKSBjb3VudHJ5TGlzdDogRWxlbWVudFJlZjtcblxuXHRvblRvdWNoZWQgPSAoKSA9PiB7fTtcblx0cHJvcGFnYXRlQ2hhbmdlID0gKF86IENoYW5nZURhdGEpID0+IHt9O1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgY291bnRyeUNvZGVEYXRhOiBDb3VudHJ5Q29kZSkge31cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblx0XHRjb25zdCBzZWxlY3RlZElTTyA9IGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddO1xuXHRcdGlmIChcblx0XHRcdHRoaXMuYWxsQ291bnRyaWVzICYmXG5cdFx0XHRzZWxlY3RlZElTTyAmJlxuXHRcdFx0c2VsZWN0ZWRJU08uY3VycmVudFZhbHVlICE9PSBzZWxlY3RlZElTTy5wcmV2aW91c1ZhbHVlXG5cdFx0KSB7XG5cdFx0XHR0aGlzLmdldFNlbGVjdGVkQ291bnRyeSgpO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlcy5wcmVmZXJyZWRDb3VudHJpZXMpIHtcblx0XHRcdHRoaXMuZ2V0UHJlZmVycmVkQ291bnRyaWVzKCk7XG5cdFx0fVxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcblx0fVxuXG5cdC8qXG5cdFx0VGhpcyBpcyBhIHdyYXBwZXIgbWV0aG9kIHRvIGF2b2lkIGNhbGxpbmcgdGhpcy5uZ09uSW5pdCgpIGluIHdyaXRlVmFsdWUoKS5cblx0XHRSZWY6IGh0dHA6Ly9jb2RlbHl6ZXIuY29tL3J1bGVzL25vLWxpZmUtY3ljbGUtY2FsbC9cblx0Ki9cblx0aW5pdCgpIHtcblx0XHR0aGlzLmZldGNoQ291bnRyeURhdGEoKTtcblx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLmdldFByZWZlcnJlZENvdW50cmllcygpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5vbmx5Q291bnRyaWVzLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5hbGxDb3VudHJpZXMgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoKGMpID0+XG5cdFx0XHRcdHRoaXMub25seUNvdW50cmllcy5pbmNsdWRlcyhjLmlzbzIpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5zZWxlY3RGaXJzdENvdW50cnkpIHtcblx0XHRcdGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24ubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93blswXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldFNlbGVjdGVkQ291bnRyeSh0aGlzLmFsbENvdW50cmllc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZ2V0U2VsZWN0ZWRDb3VudHJ5KCk7XG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xuXHR9XG5cblx0Z2V0UHJlZmVycmVkQ291bnRyaWVzKCkge1xuXHRcdGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllcy5sZW5ndGgpIHtcblx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93biA9IFtdO1xuXHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXMuZm9yRWFjaCgoaXNvMikgPT4ge1xuXHRcdFx0XHRjb25zdCBwcmVmZXJyZWRDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKChjKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIGMuaXNvMiA9PT0gaXNvMjtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duLnB1c2gocHJlZmVycmVkQ291bnRyeVswXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRnZXRTZWxlY3RlZENvdW50cnkoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJ5SVNPKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbmQoKGMpID0+IHtcblx0XHRcdFx0cmV0dXJuIGMuaXNvMi50b0xvd2VyQ2FzZSgpID09PSB0aGlzLnNlbGVjdGVkQ291bnRyeUlTTy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZENvdW50cnkpIHtcblx0XHRcdFx0aWYgKHRoaXMucGhvbmVOdW1iZXIpIHtcblx0XHRcdFx0XHR0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBSZWFzb246IGF2b2lkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NDM1ODEzMy8xNjE3NTkwXG5cdFx0XHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1udWxsLWtleXdvcmRcblx0XHRcdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZShudWxsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5OiBDb3VudHJ5KSB7XG5cdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSBjb3VudHJ5O1xuXHRcdHRoaXMuY291bnRyeUNoYW5nZS5lbWl0KGNvdW50cnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNlYXJjaCBjb3VudHJ5IGJhc2VkIG9uIGNvdW50cnkgbmFtZSwgaXNvMiwgZGlhbENvZGUgb3IgYWxsIG9mIHRoZW0uXG5cdCAqL1xuXHRzZWFyY2hDb3VudHJ5KCkge1xuXHRcdGlmICghdGhpcy5jb3VudHJ5U2VhcmNoVGV4dCkge1xuXHRcdFx0dGhpcy5jb3VudHJ5TGlzdC5uYXRpdmVFbGVtZW50XG5cdFx0XHRcdC5xdWVyeVNlbGVjdG9yKCcuaXRpX19jb3VudHJ5LWxpc3QgbGknKVxuXHRcdFx0XHQuc2Nyb2xsSW50b1ZpZXcoe1xuXHRcdFx0XHRcdGJlaGF2aW9yOiAnc21vb3RoJyxcblx0XHRcdFx0XHRibG9jazogJ25lYXJlc3QnLFxuXHRcdFx0XHRcdGlubGluZTogJ25lYXJlc3QnLFxuXHRcdFx0XHR9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgY291bnRyeVNlYXJjaFRleHRMb3dlciA9IHRoaXMuY291bnRyeVNlYXJjaFRleHQudG9Mb3dlckNhc2UoKTtcblx0XHRjb25zdCBjb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKChjKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuQWxsKSA+IC0xKSB7XG5cdFx0XHRcdC8vIFNlYXJjaCBpbiBhbGwgZmllbGRzXG5cdFx0XHRcdGlmIChjLmlzbzIudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gYztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoYy5kaWFsQ29kZS5zdGFydHNXaXRoKHRoaXMuY291bnRyeVNlYXJjaFRleHQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE9yIHNlYXJjaCBieSBzcGVjaWZpYyBTZWFyY2hDb3VudHJ5RmllbGQocylcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLklzbzIpID4gLTEpIHtcblx0XHRcdFx0XHRpZiAoYy5pc28yLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChjb3VudHJ5U2VhcmNoVGV4dExvd2VyKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5OYW1lKSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuRGlhbENvZGUpID4gLTEpIHtcblx0XHRcdFx0XHRpZiAoYy5kaWFsQ29kZS5zdGFydHNXaXRoKHRoaXMuY291bnRyeVNlYXJjaFRleHQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChjb3VudHJ5Lmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGVsID0gdGhpcy5jb3VudHJ5TGlzdC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdCcjJyArIGNvdW50cnlbMF0uaHRtbElkXG5cdFx0XHQpO1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdGVsLnNjcm9sbEludG9WaWV3KHtcblx0XHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCcsXG5cdFx0XHRcdFx0YmxvY2s6ICduZWFyZXN0Jyxcblx0XHRcdFx0XHRpbmxpbmU6ICduZWFyZXN0Jyxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xuXHR9XG5cblx0cHVibGljIG9uUGhvbmVOdW1iZXJDaGFuZ2UoKTogdm9pZCB7XG5cdFx0bGV0IGNvdW50cnlDb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0Ly8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSB1c2VyIHNldHMgdGhlIHZhbHVlIHByb2dyYW1hdGljYWxseSBiYXNlZCBvbiBhIHBlcnNpc3RlZCBDaGFuZ2VEYXRhIG9iai5cblx0XHRpZiAodGhpcy5waG9uZU51bWJlciAmJiB0eXBlb2YgdGhpcy5waG9uZU51bWJlciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGNvbnN0IG51bWJlck9iajogQ2hhbmdlRGF0YSA9IHRoaXMucGhvbmVOdW1iZXI7XG5cdFx0XHR0aGlzLnBob25lTnVtYmVyID0gbnVtYmVyT2JqLm51bWJlcjtcblx0XHRcdGNvdW50cnlDb2RlID0gbnVtYmVyT2JqLmNvdW50cnlDb2RlO1xuXHRcdH1cblxuXHRcdHRoaXMudmFsdWUgPSB0aGlzLnBob25lTnVtYmVyO1xuXHRcdGNvdW50cnlDb2RlID0gY291bnRyeUNvZGUgfHwgdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpO1xuXHRcdGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcblx0XHR0cnkge1xuXHRcdFx0bnVtYmVyID0gdGhpcy5waG9uZVV0aWwucGFyc2UodGhpcy5waG9uZU51bWJlciwgY291bnRyeUNvZGUpO1xuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHQvLyBhdXRvIHNlbGVjdCBjb3VudHJ5IGJhc2VkIG9uIHRoZSBleHRlbnNpb24gKGFuZCBhcmVhQ29kZSBpZiBuZWVkZWQpIChlLmcgc2VsZWN0IENhbmFkYSBpZiBudW1iZXIgc3RhcnRzIHdpdGggKzEgNDE2KVxuXHRcdGlmICh0aGlzLmVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0KSB7XG5cdFx0XHRjb3VudHJ5Q29kZSA9XG5cdFx0XHRcdG51bWJlciAmJiBudW1iZXIuZ2V0Q291bnRyeUNvZGUoKVxuXHRcdFx0XHRcdD8gdGhpcy5nZXRDb3VudHJ5SXNvQ29kZShudW1iZXIuZ2V0Q291bnRyeUNvZGUoKSwgbnVtYmVyKVxuXHRcdFx0XHRcdDogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcblx0XHRcdGlmIChjb3VudHJ5Q29kZSAmJiBjb3VudHJ5Q29kZSAhPT0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMikge1xuXHRcdFx0XHRjb25zdCBuZXdDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuc29ydCgoYSwgYikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcblx0XHRcdFx0fSkuZmluZChcblx0XHRcdFx0XHQoYykgPT4gYy5pc28yID09PSBjb3VudHJ5Q29kZVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAobmV3Q291bnRyeSkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gbmV3Q291bnRyeTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRjb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlID8gY291bnRyeUNvZGUgOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xuXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xuXG5cdFx0aWYgKCF0aGlzLnZhbHVlKSB7XG5cdFx0XHQvLyBSZWFzb246IGF2b2lkIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NDM1ODEzMy8xNjE3NTkwXG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW51bGwta2V5d29yZFxuXHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UobnVsbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGludGxObyA9IG51bWJlclxuXHRcdFx0XHQ/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKVxuXHRcdFx0XHQ6ICcnO1xuXG5cdFx0XHQvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXG5cdFx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIGludGxObykge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XG5cdFx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcblx0XHRcdFx0aW50ZXJuYXRpb25hbE51bWJlcjogaW50bE5vLFxuXHRcdFx0XHRuYXRpb25hbE51bWJlcjogbnVtYmVyXG5cdFx0XHRcdFx0PyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuTkFUSU9OQUwpXG5cdFx0XHRcdFx0OiAnJyxcblx0XHRcdFx0ZTE2NE51bWJlcjogbnVtYmVyXG5cdFx0XHRcdFx0PyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuRTE2NClcblx0XHRcdFx0XHQ6ICcnLFxuXHRcdFx0XHRjb3VudHJ5Q29kZTogY291bnRyeUNvZGUudG9VcHBlckNhc2UoKSxcblx0XHRcdFx0ZGlhbENvZGU6ICcrJyArIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIG9uQ291bnRyeVNlbGVjdChjb3VudHJ5OiBDb3VudHJ5LCBlbCk6IHZvaWQge1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KGNvdW50cnkpO1xuXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xuXG5cdFx0aWYgKHRoaXMucGhvbmVOdW1iZXIgJiYgdGhpcy5waG9uZU51bWJlci5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5waG9uZU51bWJlcjtcblxuXHRcdFx0bGV0IG51bWJlcjogbHBuLlBob25lTnVtYmVyO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bnVtYmVyID0gdGhpcy5waG9uZVV0aWwucGFyc2UoXG5cdFx0XHRcdFx0dGhpcy5waG9uZU51bWJlcixcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKClcblx0XHRcdFx0KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHRcdGNvbnN0IGludGxObyA9IG51bWJlclxuXHRcdFx0XHQ/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKVxuXHRcdFx0XHQ6ICcnO1xuXG5cdFx0XHQvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXG5cdFx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIGludGxObykge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XG5cdFx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcblx0XHRcdFx0aW50ZXJuYXRpb25hbE51bWJlcjogaW50bE5vLFxuXHRcdFx0XHRuYXRpb25hbE51bWJlcjogbnVtYmVyXG5cdFx0XHRcdFx0PyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuTkFUSU9OQUwpXG5cdFx0XHRcdFx0OiAnJyxcblx0XHRcdFx0ZTE2NE51bWJlcjogbnVtYmVyXG5cdFx0XHRcdFx0PyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuRTE2NClcblx0XHRcdFx0XHQ6ICcnLFxuXHRcdFx0XHRjb3VudHJ5Q29kZTogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0XHRkaWFsQ29kZTogJysnICsgdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGUsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gUmVhc29uOiBhdm9pZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTQzNTgxMzMvMTYxNzU5MFxuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1udWxsLWtleXdvcmRcblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKG51bGwpO1xuXHRcdH1cblxuXHRcdGVsLmZvY3VzKCk7XG5cdH1cblxuXHRwdWJsaWMgb25JbnB1dEtleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cdFx0Y29uc3QgYWxsb3dlZENoYXJzID0gL1swLTlcXCtcXC1cXCBdLztcblx0XHRjb25zdCBhbGxvd2VkQ3RybENoYXJzID0gL1theGN2XS87IC8vIEFsbG93cyBjb3B5LXBhc3Rpbmdcblx0XHRjb25zdCBhbGxvd2VkT3RoZXJLZXlzID0gW1xuXHRcdFx0J0Fycm93TGVmdCcsXG5cdFx0XHQnQXJyb3dVcCcsXG5cdFx0XHQnQXJyb3dSaWdodCcsXG5cdFx0XHQnQXJyb3dEb3duJyxcblx0XHRcdCdIb21lJyxcblx0XHRcdCdFbmQnLFxuXHRcdFx0J0luc2VydCcsXG5cdFx0XHQnRGVsZXRlJyxcblx0XHRcdCdCYWNrc3BhY2UnLFxuXHRcdF07XG5cblx0XHRpZiAoXG5cdFx0XHQhYWxsb3dlZENoYXJzLnRlc3QoZXZlbnQua2V5KSAmJlxuXHRcdFx0IShldmVudC5jdHJsS2V5ICYmIGFsbG93ZWRDdHJsQ2hhcnMudGVzdChldmVudC5rZXkpKSAmJlxuXHRcdFx0IWFsbG93ZWRPdGhlcktleXMuaW5jbHVkZXMoZXZlbnQua2V5KVxuXHRcdCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgZmV0Y2hDb3VudHJ5RGF0YSgpOiB2b2lkIHtcblx0XHQvKiBDbGVhcmluZyB0aGUgbGlzdCB0byBhdm9pZCBkdXBsaWNhdGVzIChodHRwczovL2dpdGh1Yi5jb20vd2ViY2F0MTIzNDUvbmd4LWludGwtdGVsLWlucHV0L2lzc3Vlcy8yNDgpICovXG5cdFx0dGhpcy5hbGxDb3VudHJpZXMgPSBbXTtcblxuXHRcdHRoaXMuY291bnRyeUNvZGVEYXRhLmFsbENvdW50cmllcy5mb3JFYWNoKChjKSA9PiB7XG5cdFx0XHRjb25zdCBjb3VudHJ5OiBDb3VudHJ5ID0ge1xuXHRcdFx0XHRuYW1lOiBjWzBdLnRvU3RyaW5nKCksXG5cdFx0XHRcdGlzbzI6IGNbMV0udG9TdHJpbmcoKSxcblx0XHRcdFx0ZGlhbENvZGU6IGNbMl0udG9TdHJpbmcoKSxcblx0XHRcdFx0cHJpb3JpdHk6ICtjWzNdIHx8IDAsXG5cdFx0XHRcdGFyZWFDb2RlczogKGNbNF0gYXMgc3RyaW5nW10pIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0aHRtbElkOiBgaXRpLTBfX2l0ZW0tJHtjWzFdLnRvU3RyaW5nKCl9YCxcblx0XHRcdFx0ZmxhZ0NsYXNzOiBgaXRpX18ke2NbMV0udG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSgpfWAsXG5cdFx0XHRcdHBsYWNlSG9sZGVyOiAnJyxcblx0XHRcdH07XG5cblx0XHRcdGlmICh0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKSB7XG5cdFx0XHRcdGNvdW50cnkucGxhY2VIb2xkZXIgPSB0aGlzLmdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoXG5cdFx0XHRcdFx0Y291bnRyeS5pc28yLnRvVXBwZXJDYXNlKClcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5hbGxDb3VudHJpZXMucHVzaChjb3VudHJ5KTtcblx0XHR9KTtcblx0fVxuXG5cdHByb3RlY3RlZCBnZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnlDb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5waG9uZVV0aWwuZm9ybWF0KFxuXHRcdFx0XHR0aGlzLnBob25lVXRpbC5nZXRFeGFtcGxlTnVtYmVyKGNvdW50cnlDb2RlKSxcblx0XHRcdFx0bHBuLlBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUxcblx0XHRcdCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGU7XG5cdFx0fVxuXHR9XG5cblx0cmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblx0fVxuXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcblx0XHR0aGlzLm9uVG91Y2hlZCA9IGZuO1xuXHR9XG5cblx0c2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG5cdFx0dGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG5cdH1cblxuXHR3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG5cdFx0aWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cdFx0dGhpcy5waG9uZU51bWJlciA9IG9iajtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMub25QaG9uZU51bWJlckNoYW5nZSgpO1xuXHRcdH0sIDEpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRDb3VudHJ5SXNvQ29kZShcblx0XHRjb3VudHJ5Q29kZTogbnVtYmVyLFxuXHRcdG51bWJlcjogbHBuLlBob25lTnVtYmVyXG5cdCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0Ly8gV2lsbCB1c2UgdGhpcyB0byBtYXRjaCBhcmVhIGNvZGUgZnJvbSB0aGUgZmlyc3QgbnVtYmVyc1xuXHRcdGNvbnN0IHJhd051bWJlciA9IG51bWJlclsndmFsdWVzXyddWycyJ10udG9TdHJpbmcoKTtcblx0XHQvLyBMaXN0IG9mIGFsbCBjb3VudHJpZXMgd2l0aCBjb3VudHJ5Q29kZSAoY2FuIGJlIG1vcmUgdGhhbiBvbmUuIGUueC4gVVMsIENBLCBETywgUFIgYWxsIGhhdmUgKzEgY291bnRyeUNvZGUpXG5cdFx0Y29uc3QgY291bnRyaWVzID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKFxuXHRcdFx0KGMpID0+IGMuZGlhbENvZGUgPT09IGNvdW50cnlDb2RlLnRvU3RyaW5nKClcblx0XHQpO1xuXHRcdC8vIE1haW4gY291bnRyeSBpcyB0aGUgY291bnRyeSwgd2hpY2ggaGFzIG5vIGFyZWFDb2RlcyBzcGVjaWZpZWQgaW4gY291bnRyeS1jb2RlLnRzIGZpbGUuXG5cdFx0Y29uc3QgbWFpbkNvdW50cnkgPSBjb3VudHJpZXMuZmluZCgoYykgPT4gYy5hcmVhQ29kZXMgPT09IHVuZGVmaW5lZCk7XG5cdFx0Ly8gU2Vjb25kYXJ5IGNvdW50cmllcyBhcmUgYWxsIGNvdW50cmllcywgd2hpY2ggaGF2ZSBhcmVhQ29kZXMgc3BlY2lmaWVkIGluIGNvdW50cnktY29kZS50cyBmaWxlLlxuXHRcdGNvbnN0IHNlY29uZGFyeUNvdW50cmllcyA9IGNvdW50cmllcy5maWx0ZXIoXG5cdFx0XHQoYykgPT4gYy5hcmVhQ29kZXMgIT09IHVuZGVmaW5lZFxuXHRcdCk7XG5cdFx0bGV0IG1hdGNoZWRDb3VudHJ5ID0gbWFpbkNvdW50cnkgPyBtYWluQ291bnRyeS5pc28yIDogdW5kZWZpbmVkO1xuXG5cdFx0Lypcblx0XHRcdEl0ZXJhdGUgb3ZlciBlYWNoIHNlY29uZGFyeSBjb3VudHJ5IGFuZCBjaGVjayBpZiBuYXRpb25hbE51bWJlciBzdGFydHMgd2l0aCBhbnkgb2YgYXJlYUNvZGVzIGF2YWlsYWJsZS5cblx0XHRcdElmIG5vIG1hdGNoZXMgZm91bmQsIGZhbGxiYWNrIHRvIHRoZSBtYWluIGNvdW50cnkuXG5cdFx0Ki9cblx0XHRzZWNvbmRhcnlDb3VudHJpZXMuZm9yRWFjaCgoY291bnRyeSkgPT4ge1xuXHRcdFx0Y291bnRyeS5hcmVhQ29kZXMuZm9yRWFjaCgoYXJlYUNvZGUpID0+IHtcblx0XHRcdFx0aWYgKHJhd051bWJlci5zdGFydHNXaXRoKGFyZWFDb2RlKSkge1xuXHRcdFx0XHRcdG1hdGNoZWRDb3VudHJ5ID0gY291bnRyeS5pc28yO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBtYXRjaGVkQ291bnRyeTtcblx0fVxuXG5cdHNlcGFyYXRlRGlhbENvZGVQbGFjZUhvbGRlcihwbGFjZWhvbGRlcjogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5yZW1vdmVEaWFsQ29kZShwbGFjZWhvbGRlcik7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZURpYWxDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgcGhvbmVOdW1iZXIpIHtcblx0XHRcdHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIuc3Vic3RyKHBob25lTnVtYmVyLmluZGV4T2YoJyAnKSArIDEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGhvbmVOdW1iZXI7XG5cdH1cblxuXHQvLyBhZGp1c3QgaW5wdXQgYWxpZ25tZW50XG5cdHByaXZhdGUgY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKSB7XG5cdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiB0aGlzLnNlbGVjdGVkQ291bnRyeSkge1xuXHRcdFx0Y29uc3QgY250cnlDZCA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlO1xuXHRcdFx0dGhpcy5zZXBhcmF0ZURpYWxDb2RlQ2xhc3MgPVxuXHRcdFx0XHQnc2VwYXJhdGUtZGlhbC1jb2RlIGl0aS1zZGMtJyArIChjbnRyeUNkLmxlbmd0aCArIDEpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlcGFyYXRlRGlhbENvZGVDbGFzcyA9ICcnO1xuXHRcdH1cblx0fVxufVxuIl19