(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('google-libphonenumber'), require('@angular/core'), require('@angular/forms'), require('ngx-bootstrap/dropdown'), require('ngx-bootstrap/tooltip'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-intl-tel-input', ['exports', 'google-libphonenumber', '@angular/core', '@angular/forms', 'ngx-bootstrap/dropdown', 'ngx-bootstrap/tooltip', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-intl-tel-input'] = {}, global['^3']['2']['3'], global.ng.core, global.ng.forms, global['ngx-bootstrap-dropdown'], global['ngx-bootstrap-tooltip'], global.ng.common));
}(this, (function (exports, lpn, core, forms, dropdown, tooltip, common) { 'use strict';

    (function (CountryISO) {
        CountryISO["Afghanistan"] = "af";
        CountryISO["Albania"] = "al";
        CountryISO["Algeria"] = "dz";
        CountryISO["AmericanSamoa"] = "as";
        CountryISO["Andorra"] = "ad";
        CountryISO["Angola"] = "ao";
        CountryISO["Anguilla"] = "ai";
        CountryISO["AntiguaAndBarbuda"] = "ag";
        CountryISO["Argentina"] = "ar";
        CountryISO["Armenia"] = "am";
        CountryISO["Aruba"] = "aw";
        CountryISO["Australia"] = "au";
        CountryISO["Austria"] = "at";
        CountryISO["Azerbaijan"] = "az";
        CountryISO["Bahamas"] = "bs";
        CountryISO["Bahrain"] = "bh";
        CountryISO["Bangladesh"] = "bd";
        CountryISO["Barbados"] = "bb";
        CountryISO["Belarus"] = "by";
        CountryISO["Belgium"] = "be";
        CountryISO["Belize"] = "bz";
        CountryISO["Benin"] = "bj";
        CountryISO["Bermuda"] = "bm";
        CountryISO["Bhutan"] = "bt";
        CountryISO["Bolivia"] = "bo";
        CountryISO["BosniaAndHerzegovina"] = "ba";
        CountryISO["Botswana"] = "bw";
        CountryISO["Brazil"] = "br";
        CountryISO["BritishIndianOceanTerritory"] = "io";
        CountryISO["BritishVirginIslands"] = "vg";
        CountryISO["Brunei"] = "bn";
        CountryISO["Bulgaria"] = "bg";
        CountryISO["BurkinaFaso"] = "bf";
        CountryISO["Burundi"] = "bi";
        CountryISO["Cambodia"] = "kh";
        CountryISO["Cameroon"] = "cm";
        CountryISO["Canada"] = "ca";
        CountryISO["CapeVerde"] = "cv";
        CountryISO["CaribbeanNetherlands"] = "bq";
        CountryISO["CaymanIslands"] = "ky";
        CountryISO["CentralAfricanRepublic"] = "cf";
        CountryISO["Chad"] = "td";
        CountryISO["Chile"] = "cl";
        CountryISO["China"] = "cn";
        CountryISO["ChristmasIsland"] = "cx";
        CountryISO["Cocos"] = "cc";
        CountryISO["Colombia"] = "co";
        CountryISO["Comoros"] = "km";
        CountryISO["CongoDRCJamhuriYaKidemokrasiaYaKongo"] = "cd";
        CountryISO["CongoRepublicCongoBrazzaville"] = "cg";
        CountryISO["CookIslands"] = "ck";
        CountryISO["CostaRica"] = "cr";
        CountryISO["C\u00F4teDIvoire"] = "ci";
        CountryISO["Croatia"] = "hr";
        CountryISO["Cuba"] = "cu";
        CountryISO["Cura\u00E7ao"] = "cw";
        CountryISO["Cyprus"] = "cy";
        CountryISO["CzechRepublic"] = "cz";
        CountryISO["Denmark"] = "dk";
        CountryISO["Djibouti"] = "dj";
        CountryISO["Dominica"] = "dm";
        CountryISO["DominicanRepublic"] = "do";
        CountryISO["Ecuador"] = "ec";
        CountryISO["Egypt"] = "eg";
        CountryISO["ElSalvador"] = "sv";
        CountryISO["EquatorialGuinea"] = "gq";
        CountryISO["Eritrea"] = "er";
        CountryISO["Estonia"] = "ee";
        CountryISO["Ethiopia"] = "et";
        CountryISO["FalklandIslands"] = "fk";
        CountryISO["FaroeIslands"] = "fo";
        CountryISO["Fiji"] = "fj";
        CountryISO["Finland"] = "fi";
        CountryISO["France"] = "fr";
        CountryISO["FrenchGuiana"] = "gf";
        CountryISO["FrenchPolynesia"] = "pf";
        CountryISO["Gabon"] = "ga";
        CountryISO["Gambia"] = "gm";
        CountryISO["Georgia"] = "ge";
        CountryISO["Germany"] = "de";
        CountryISO["Ghana"] = "gh";
        CountryISO["Gibraltar"] = "gi";
        CountryISO["Greece"] = "gr";
        CountryISO["Greenland"] = "gl";
        CountryISO["Grenada"] = "gd";
        CountryISO["Guadeloupe"] = "gp";
        CountryISO["Guam"] = "gu";
        CountryISO["Guatemala"] = "gt";
        CountryISO["Guernsey"] = "gg";
        CountryISO["Guinea"] = "gn";
        CountryISO["GuineaBissau"] = "gw";
        CountryISO["Guyana"] = "gy";
        CountryISO["Haiti"] = "ht";
        CountryISO["Honduras"] = "hn";
        CountryISO["HongKong"] = "hk";
        CountryISO["Hungary"] = "hu";
        CountryISO["Iceland"] = "is";
        CountryISO["India"] = "in";
        CountryISO["Indonesia"] = "id";
        CountryISO["Iran"] = "ir";
        CountryISO["Iraq"] = "iq";
        CountryISO["Ireland"] = "ie";
        CountryISO["IsleOfMan"] = "im";
        CountryISO["Israel"] = "il";
        CountryISO["Italy"] = "it";
        CountryISO["Jamaica"] = "jm";
        CountryISO["Japan"] = "jp";
        CountryISO["Jersey"] = "je";
        CountryISO["Jordan"] = "jo";
        CountryISO["Kazakhstan"] = "kz";
        CountryISO["Kenya"] = "ke";
        CountryISO["Kiribati"] = "ki";
        CountryISO["Kosovo"] = "xk";
        CountryISO["Kuwait"] = "kw";
        CountryISO["Kyrgyzstan"] = "kg";
        CountryISO["Laos"] = "la";
        CountryISO["Latvia"] = "lv";
        CountryISO["Lebanon"] = "lb";
        CountryISO["Lesotho"] = "ls";
        CountryISO["Liberia"] = "lr";
        CountryISO["Libya"] = "ly";
        CountryISO["Liechtenstein"] = "li";
        CountryISO["Lithuania"] = "lt";
        CountryISO["Luxembourg"] = "lu";
        CountryISO["Macau"] = "mo";
        CountryISO["Macedonia"] = "mk";
        CountryISO["Madagascar"] = "mg";
        CountryISO["Malawi"] = "mw";
        CountryISO["Malaysia"] = "my";
        CountryISO["Maldives"] = "mv";
        CountryISO["Mali"] = "ml";
        CountryISO["Malta"] = "mt";
        CountryISO["MarshallIslands"] = "mh";
        CountryISO["Martinique"] = "mq";
        CountryISO["Mauritania"] = "mr";
        CountryISO["Mauritius"] = "mu";
        CountryISO["Mayotte"] = "yt";
        CountryISO["Mexico"] = "mx";
        CountryISO["Micronesia"] = "fm";
        CountryISO["Moldova"] = "md";
        CountryISO["Monaco"] = "mc";
        CountryISO["Mongolia"] = "mn";
        CountryISO["Montenegro"] = "me";
        CountryISO["Montserrat"] = "ms";
        CountryISO["Morocco"] = "ma";
        CountryISO["Mozambique"] = "mz";
        CountryISO["Myanmar"] = "mm";
        CountryISO["Namibia"] = "na";
        CountryISO["Nauru"] = "nr";
        CountryISO["Nepal"] = "np";
        CountryISO["Netherlands"] = "nl";
        CountryISO["NewCaledonia"] = "nc";
        CountryISO["NewZealand"] = "nz";
        CountryISO["Nicaragua"] = "ni";
        CountryISO["Niger"] = "ne";
        CountryISO["Nigeria"] = "ng";
        CountryISO["Niue"] = "nu";
        CountryISO["NorfolkIsland"] = "nf";
        CountryISO["NorthKorea"] = "kp";
        CountryISO["NorthernMarianaIslands"] = "mp";
        CountryISO["Norway"] = "no";
        CountryISO["Oman"] = "om";
        CountryISO["Pakistan"] = "pk";
        CountryISO["Palau"] = "pw";
        CountryISO["Palestine"] = "ps";
        CountryISO["Panama"] = "pa";
        CountryISO["PapuaNewGuinea"] = "pg";
        CountryISO["Paraguay"] = "py";
        CountryISO["Peru"] = "pe";
        CountryISO["Philippines"] = "ph";
        CountryISO["Poland"] = "pl";
        CountryISO["Portugal"] = "pt";
        CountryISO["PuertoRico"] = "pr";
        CountryISO["Qatar"] = "qa";
        CountryISO["R\u00E9union"] = "re";
        CountryISO["Romania"] = "ro";
        CountryISO["Russia"] = "ru";
        CountryISO["Rwanda"] = "rw";
        CountryISO["SaintBarth\u00E9lemy"] = "bl";
        CountryISO["SaintHelena"] = "sh";
        CountryISO["SaintKittsAndNevis"] = "kn";
        CountryISO["SaintLucia"] = "lc";
        CountryISO["SaintMartin"] = "mf";
        CountryISO["SaintPierreAndMiquelon"] = "pm";
        CountryISO["SaintVincentAndTheGrenadines"] = "vc";
        CountryISO["Samoa"] = "ws";
        CountryISO["SanMarino"] = "sm";
        CountryISO["S\u00E3oTom\u00E9AndPr\u00EDncipe"] = "st";
        CountryISO["SaudiArabia"] = "sa";
        CountryISO["Senegal"] = "sn";
        CountryISO["Serbia"] = "rs";
        CountryISO["Seychelles"] = "sc";
        CountryISO["SierraLeone"] = "sl";
        CountryISO["Singapore"] = "sg";
        CountryISO["SintMaarten"] = "sx";
        CountryISO["Slovakia"] = "sk";
        CountryISO["Slovenia"] = "si";
        CountryISO["SolomonIslands"] = "sb";
        CountryISO["Somalia"] = "so";
        CountryISO["SouthAfrica"] = "za";
        CountryISO["SouthKorea"] = "kr";
        CountryISO["SouthSudan"] = "ss";
        CountryISO["Spain"] = "es";
        CountryISO["SriLanka"] = "lk";
        CountryISO["Sudan"] = "sd";
        CountryISO["Suriname"] = "sr";
        CountryISO["SvalbardAndJanMayen"] = "sj";
        CountryISO["Swaziland"] = "sz";
        CountryISO["Sweden"] = "se";
        CountryISO["Switzerland"] = "ch";
        CountryISO["Syria"] = "sy";
        CountryISO["Taiwan"] = "tw";
        CountryISO["Tajikistan"] = "tj";
        CountryISO["Tanzania"] = "tz";
        CountryISO["Thailand"] = "th";
        CountryISO["TimorLeste"] = "tl";
        CountryISO["Togo"] = "tg";
        CountryISO["Tokelau"] = "tk";
        CountryISO["Tonga"] = "to";
        CountryISO["TrinidadAndTobago"] = "tt";
        CountryISO["Tunisia"] = "tn";
        CountryISO["Turkey"] = "tr";
        CountryISO["Turkmenistan"] = "tm";
        CountryISO["TurksAndCaicosIslands"] = "tc";
        CountryISO["Tuvalu"] = "tv";
        CountryISO["USVirginIslands"] = "vi";
        CountryISO["Uganda"] = "ug";
        CountryISO["Ukraine"] = "ua";
        CountryISO["UnitedArabEmirates"] = "ae";
        CountryISO["UnitedKingdom"] = "gb";
        CountryISO["UnitedStates"] = "us";
        CountryISO["Uruguay"] = "uy";
        CountryISO["Uzbekistan"] = "uz";
        CountryISO["Vanuatu"] = "vu";
        CountryISO["VaticanCity"] = "va";
        CountryISO["Venezuela"] = "ve";
        CountryISO["Vietnam"] = "vn";
        CountryISO["WallisAndFutuna"] = "wf";
        CountryISO["WesternSahara"] = "eh";
        CountryISO["Yemen"] = "ye";
        CountryISO["Zambia"] = "zm";
        CountryISO["Zimbabwe"] = "zw";
        CountryISO["\u00C5landIslands"] = "ax";
    })(exports.CountryISO || (exports.CountryISO = {}));

    var CountryCode = /** @class */ (function () {
        function CountryCode() {
            this.allCountries = [
                [
                    'Afghanistan (‫افغانستان‬‎)',
                    exports.CountryISO.Afghanistan,
                    '93'
                ],
                [
                    'Albania (Shqipëri)',
                    exports.CountryISO.Albania,
                    '355'
                ],
                [
                    'Algeria (‫الجزائر‬‎)',
                    exports.CountryISO.Algeria,
                    '213'
                ],
                [
                    'American Samoa',
                    'as',
                    '1',
                    1,
                    [
                        '684',
                    ]
                ],
                [
                    'Andorra',
                    exports.CountryISO.Andorra,
                    '376'
                ],
                [
                    'Angola',
                    exports.CountryISO.Angola,
                    '244'
                ],
                [
                    'Anguilla',
                    'ai',
                    '1',
                    1,
                    [
                        '264',
                    ]
                ],
                [
                    'Antigua and Barbuda',
                    'ag',
                    '1',
                    1,
                    [
                        '268',
                    ]
                ],
                [
                    'Argentina',
                    exports.CountryISO.Argentina,
                    '54'
                ],
                [
                    'Armenia (Հայաստան)',
                    exports.CountryISO.Armenia,
                    '374'
                ],
                [
                    'Aruba',
                    exports.CountryISO.Aruba,
                    '297'
                ],
                [
                    'Australia',
                    exports.CountryISO.Australia,
                    '61',
                    0
                ],
                [
                    'Austria (Österreich)',
                    exports.CountryISO.Austria,
                    '43'
                ],
                [
                    'Azerbaijan (Azərbaycan)',
                    exports.CountryISO.Azerbaijan,
                    '994'
                ],
                [
                    'Bahamas',
                    'bs',
                    '1',
                    1,
                    [
                        '242',
                    ]
                ],
                [
                    'Bahrain (‫البحرين‬‎)',
                    exports.CountryISO.Bahrain,
                    '973'
                ],
                [
                    'Bangladesh (বাংলাদেশ)',
                    exports.CountryISO.Bangladesh,
                    '880'
                ],
                [
                    'Barbados',
                    'bb',
                    '1',
                    1,
                    [
                        '246',
                    ]
                ],
                [
                    'Belarus (Беларусь)',
                    exports.CountryISO.Belarus,
                    '375'
                ],
                [
                    'Belgium (België)',
                    exports.CountryISO.Belgium,
                    '32'
                ],
                [
                    'Belize',
                    exports.CountryISO.Belize,
                    '501'
                ],
                [
                    'Benin (Bénin)',
                    exports.CountryISO.Benin,
                    '229'
                ],
                [
                    'Bermuda',
                    'bm',
                    '1',
                    1,
                    [
                        '441',
                    ]
                ],
                [
                    'Bhutan (འབྲུག)',
                    exports.CountryISO.Bhutan,
                    '975'
                ],
                [
                    'Bolivia',
                    exports.CountryISO.Bolivia,
                    '591'
                ],
                [
                    'Bosnia and Herzegovina (Босна и Херцеговина)',
                    exports.CountryISO.BosniaAndHerzegovina,
                    '387'
                ],
                [
                    'Botswana',
                    exports.CountryISO.Botswana,
                    '267'
                ],
                [
                    'Brazil (Brasil)',
                    exports.CountryISO.Brazil,
                    '55'
                ],
                [
                    'British Indian Ocean Territory',
                    exports.CountryISO.BritishIndianOceanTerritory,
                    '246'
                ],
                [
                    'British Virgin Islands',
                    'vg',
                    '1',
                    1,
                    [
                        '284',
                    ]
                ],
                [
                    'Brunei',
                    exports.CountryISO.Brunei,
                    '673'
                ],
                [
                    'Bulgaria (България)',
                    exports.CountryISO.Bulgaria,
                    '359'
                ],
                [
                    'Burkina Faso',
                    exports.CountryISO.BurkinaFaso,
                    '226'
                ],
                [
                    'Burundi (Uburundi)',
                    exports.CountryISO.Burundi,
                    '257'
                ],
                [
                    'Cambodia (កម្ពុជា)',
                    exports.CountryISO.Cambodia,
                    '855'
                ],
                [
                    'Cameroon (Cameroun)',
                    exports.CountryISO.Cameroon,
                    '237'
                ],
                [
                    'Canada',
                    exports.CountryISO.Canada,
                    '1',
                    1,
                    [
                        '204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416',
                        '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587',
                        '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807',
                        '819', '825', '867', '873', '902', '905'
                    ]
                ],
                [
                    'Cape Verde (Kabu Verdi)',
                    exports.CountryISO.CapeVerde,
                    '238'
                ],
                [
                    'Caribbean Netherlands',
                    exports.CountryISO.CaribbeanNetherlands,
                    '599',
                    1
                ],
                [
                    'Cayman Islands',
                    'ky',
                    '1',
                    1,
                    [
                        '345',
                    ]
                ],
                [
                    'Central African Republic (République centrafricaine)',
                    exports.CountryISO.CentralAfricanRepublic,
                    '236'
                ],
                [
                    'Chad (Tchad)',
                    exports.CountryISO.Chad,
                    '235'
                ],
                [
                    'Chile',
                    exports.CountryISO.Chile,
                    '56'
                ],
                [
                    'China (中国)',
                    exports.CountryISO.China,
                    '86'
                ],
                [
                    'Christmas Island',
                    exports.CountryISO.ChristmasIsland,
                    '61',
                    2
                ],
                [
                    'Cocos (Keeling) Islands',
                    exports.CountryISO.Cocos,
                    '61',
                    1
                ],
                [
                    'Colombia',
                    exports.CountryISO.Colombia,
                    '57'
                ],
                [
                    'Comoros (‫جزر القمر‬‎)',
                    exports.CountryISO.Comoros,
                    '269'
                ],
                [
                    'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
                    exports.CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo,
                    '243'
                ],
                [
                    'Congo (Republic) (Congo-Brazzaville)',
                    exports.CountryISO.CongoRepublicCongoBrazzaville,
                    '242'
                ],
                [
                    'Cook Islands',
                    exports.CountryISO.CookIslands,
                    '682'
                ],
                [
                    'Costa Rica',
                    exports.CountryISO.CostaRica,
                    '506'
                ],
                [
                    'Côte d’Ivoire',
                    exports.CountryISO.CôteDIvoire,
                    '225'
                ],
                [
                    'Croatia (Hrvatska)',
                    exports.CountryISO.Croatia,
                    '385'
                ],
                [
                    'Cuba',
                    exports.CountryISO.Cuba,
                    '53'
                ],
                [
                    'Curaçao',
                    exports.CountryISO.Curaçao,
                    '599',
                    0
                ],
                [
                    'Cyprus (Κύπρος)',
                    exports.CountryISO.Cyprus,
                    '357'
                ],
                [
                    'Czech Republic (Česká republika)',
                    exports.CountryISO.CzechRepublic,
                    '420'
                ],
                [
                    'Denmark (Danmark)',
                    exports.CountryISO.Denmark,
                    '45'
                ],
                [
                    'Djibouti',
                    exports.CountryISO.Djibouti,
                    '253'
                ],
                [
                    'Dominica',
                    exports.CountryISO.Dominica,
                    '1767'
                ],
                [
                    'Dominican Republic (República Dominicana)',
                    exports.CountryISO.DominicanRepublic,
                    '1',
                    2,
                    ['809', '829', '849']
                ],
                [
                    'Ecuador',
                    exports.CountryISO.Ecuador,
                    '593'
                ],
                [
                    'Egypt (‫مصر‬‎)',
                    exports.CountryISO.Egypt,
                    '20'
                ],
                [
                    'El Salvador',
                    exports.CountryISO.ElSalvador,
                    '503'
                ],
                [
                    'Equatorial Guinea (Guinea Ecuatorial)',
                    exports.CountryISO.EquatorialGuinea,
                    '240'
                ],
                [
                    'Eritrea',
                    exports.CountryISO.Eritrea,
                    '291'
                ],
                [
                    'Estonia (Eesti)',
                    exports.CountryISO.Estonia,
                    '372'
                ],
                [
                    'Ethiopia',
                    exports.CountryISO.Ethiopia,
                    '251'
                ],
                [
                    'Falkland Islands (Islas Malvinas)',
                    exports.CountryISO.FalklandIslands,
                    '500'
                ],
                [
                    'Faroe Islands (Føroyar)',
                    exports.CountryISO.FaroeIslands,
                    '298'
                ],
                [
                    'Fiji',
                    exports.CountryISO.Fiji,
                    '679'
                ],
                [
                    'Finland (Suomi)',
                    exports.CountryISO.Finland,
                    '358',
                    0
                ],
                [
                    'France',
                    exports.CountryISO.France,
                    '33'
                ],
                [
                    'French Guiana (Guyane française)',
                    exports.CountryISO.FrenchGuiana,
                    '594'
                ],
                [
                    'French Polynesia (Polynésie française)',
                    exports.CountryISO.FrenchPolynesia,
                    '689'
                ],
                [
                    'Gabon',
                    exports.CountryISO.Gabon,
                    '241'
                ],
                [
                    'Gambia',
                    exports.CountryISO.Gambia,
                    '220'
                ],
                [
                    'Georgia (საქართველო)',
                    exports.CountryISO.Georgia,
                    '995'
                ],
                [
                    'Germany (Deutschland)',
                    exports.CountryISO.Germany,
                    '49'
                ],
                [
                    'Ghana (Gaana)',
                    exports.CountryISO.Ghana,
                    '233'
                ],
                [
                    'Gibraltar',
                    exports.CountryISO.Gibraltar,
                    '350'
                ],
                [
                    'Greece (Ελλάδα)',
                    exports.CountryISO.Greece,
                    '30'
                ],
                [
                    'Greenland (Kalaallit Nunaat)',
                    exports.CountryISO.Greenland,
                    '299'
                ],
                [
                    'Grenada',
                    exports.CountryISO.Grenada,
                    '1473'
                ],
                [
                    'Guadeloupe',
                    exports.CountryISO.Guadeloupe,
                    '590',
                    0
                ],
                [
                    'Guam',
                    'gu',
                    '1',
                    1,
                    [
                        '671',
                    ]
                ],
                [
                    'Guatemala',
                    exports.CountryISO.Guatemala,
                    '502'
                ],
                [
                    'Guernsey',
                    exports.CountryISO.Guernsey,
                    '44',
                    1,
                    [1481]
                ],
                [
                    'Guinea (Guinée)',
                    exports.CountryISO.Guinea,
                    '224'
                ],
                [
                    'Guinea-Bissau (Guiné Bissau)',
                    exports.CountryISO.GuineaBissau,
                    '245'
                ],
                [
                    'Guyana',
                    exports.CountryISO.Guyana,
                    '592'
                ],
                [
                    'Haiti',
                    exports.CountryISO.Haiti,
                    '509'
                ],
                [
                    'Honduras',
                    exports.CountryISO.Honduras,
                    '504'
                ],
                [
                    'Hong Kong (香港)',
                    exports.CountryISO.HongKong,
                    '852'
                ],
                [
                    'Hungary (Magyarország)',
                    exports.CountryISO.Hungary,
                    '36'
                ],
                [
                    'Iceland (Ísland)',
                    exports.CountryISO.Iceland,
                    '354'
                ],
                [
                    'India (भारत)',
                    exports.CountryISO.India,
                    '91'
                ],
                [
                    'Indonesia',
                    exports.CountryISO.Indonesia,
                    '62'
                ],
                [
                    'Iran (‫ایران‬‎)',
                    exports.CountryISO.Iran,
                    '98'
                ],
                [
                    'Iraq (‫العراق‬‎)',
                    exports.CountryISO.Iraq,
                    '964'
                ],
                [
                    'Ireland',
                    exports.CountryISO.Ireland,
                    '353'
                ],
                [
                    'Isle of Man',
                    exports.CountryISO.IsleOfMan,
                    '44',
                    2,
                    [1624]
                ],
                [
                    'Israel (‫ישראל‬‎)',
                    exports.CountryISO.Israel,
                    '972'
                ],
                [
                    'Italy (Italia)',
                    exports.CountryISO.Italy,
                    '39',
                    0
                ],
                [
                    'Jamaica',
                    'jm',
                    '1',
                    1,
                    [
                        '876',
                    ]
                ],
                [
                    'Japan (日本)',
                    exports.CountryISO.Japan,
                    '81'
                ],
                [
                    'Jersey',
                    exports.CountryISO.Jersey,
                    '44',
                    3,
                    [1534]
                ],
                [
                    'Jordan (‫الأردن‬‎)',
                    exports.CountryISO.Jordan,
                    '962'
                ],
                [
                    'Kazakhstan (Казахстан)',
                    exports.CountryISO.Kazakhstan,
                    '7',
                    1
                ],
                [
                    'Kenya',
                    exports.CountryISO.Kenya,
                    '254'
                ],
                [
                    'Kiribati',
                    exports.CountryISO.Kiribati,
                    '686'
                ],
                [
                    'Kosovo',
                    exports.CountryISO.Kosovo,
                    '383'
                ],
                [
                    'Kuwait (‫الكويت‬‎)',
                    exports.CountryISO.Kuwait,
                    '965'
                ],
                [
                    'Kyrgyzstan (Кыргызстан)',
                    exports.CountryISO.Kyrgyzstan,
                    '996'
                ],
                [
                    'Laos (ລາວ)',
                    exports.CountryISO.Laos,
                    '856'
                ],
                [
                    'Latvia (Latvija)',
                    exports.CountryISO.Latvia,
                    '371'
                ],
                [
                    'Lebanon (‫لبنان‬‎)',
                    exports.CountryISO.Lebanon,
                    '961'
                ],
                [
                    'Lesotho',
                    exports.CountryISO.Lesotho,
                    '266'
                ],
                [
                    'Liberia',
                    exports.CountryISO.Liberia,
                    '231'
                ],
                [
                    'Libya (‫ليبيا‬‎)',
                    exports.CountryISO.Libya,
                    '218'
                ],
                [
                    'Liechtenstein',
                    exports.CountryISO.Liechtenstein,
                    '423'
                ],
                [
                    'Lithuania (Lietuva)',
                    exports.CountryISO.Lithuania,
                    '370'
                ],
                [
                    'Luxembourg',
                    exports.CountryISO.Luxembourg,
                    '352'
                ],
                [
                    'Macau (澳門)',
                    exports.CountryISO.Macau,
                    '853'
                ],
                [
                    'Macedonia (FYROM) (Македонија)',
                    exports.CountryISO.Macedonia,
                    '389'
                ],
                [
                    'Madagascar (Madagasikara)',
                    exports.CountryISO.Madagascar,
                    '261'
                ],
                [
                    'Malawi',
                    exports.CountryISO.Malawi,
                    '265'
                ],
                [
                    'Malaysia',
                    exports.CountryISO.Malaysia,
                    '60'
                ],
                [
                    'Maldives',
                    exports.CountryISO.Maldives,
                    '960'
                ],
                [
                    'Mali',
                    exports.CountryISO.Mali,
                    '223'
                ],
                [
                    'Malta',
                    exports.CountryISO.Malta,
                    '356'
                ],
                [
                    'Marshall Islands',
                    exports.CountryISO.MarshallIslands,
                    '692'
                ],
                [
                    'Martinique',
                    exports.CountryISO.Martinique,
                    '596'
                ],
                [
                    'Mauritania (‫موريتانيا‬‎)',
                    exports.CountryISO.Mauritania,
                    '222'
                ],
                [
                    'Mauritius (Moris)',
                    exports.CountryISO.Mauritius,
                    '230'
                ],
                [
                    'Mayotte',
                    exports.CountryISO.Mayotte,
                    '262',
                    1
                ],
                [
                    'Mexico (México)',
                    exports.CountryISO.Mexico,
                    '52'
                ],
                [
                    'Micronesia',
                    exports.CountryISO.Micronesia,
                    '691'
                ],
                [
                    'Moldova (Republica Moldova)',
                    exports.CountryISO.Moldova,
                    '373'
                ],
                [
                    'Monaco',
                    exports.CountryISO.Monaco,
                    '377'
                ],
                [
                    'Mongolia (Монгол)',
                    exports.CountryISO.Mongolia,
                    '976'
                ],
                [
                    'Montenegro (Crna Gora)',
                    exports.CountryISO.Montenegro,
                    '382'
                ],
                [
                    'Montserrat',
                    'ms',
                    '1',
                    1,
                    [
                        '664',
                    ]
                ],
                [
                    'Morocco (‫المغرب‬‎)',
                    exports.CountryISO.Morocco,
                    '212',
                    0
                ],
                [
                    'Mozambique (Moçambique)',
                    exports.CountryISO.Mozambique,
                    '258'
                ],
                [
                    'Myanmar (Burma) (မြန်မာ)',
                    exports.CountryISO.Myanmar,
                    '95'
                ],
                [
                    'Namibia (Namibië)',
                    exports.CountryISO.Namibia,
                    '264'
                ],
                [
                    'Nauru',
                    exports.CountryISO.Nauru,
                    '674'
                ],
                [
                    'Nepal (नेपाल)',
                    exports.CountryISO.Nepal,
                    '977'
                ],
                [
                    'Netherlands (Nederland)',
                    exports.CountryISO.Netherlands,
                    '31'
                ],
                [
                    'New Caledonia (Nouvelle-Calédonie)',
                    exports.CountryISO.NewCaledonia,
                    '687'
                ],
                [
                    'New Zealand',
                    exports.CountryISO.NewZealand,
                    '64'
                ],
                [
                    'Nicaragua',
                    exports.CountryISO.Nicaragua,
                    '505'
                ],
                [
                    'Niger (Nijar)',
                    exports.CountryISO.Niger,
                    '227'
                ],
                [
                    'Nigeria',
                    exports.CountryISO.Nigeria,
                    '234'
                ],
                [
                    'Niue',
                    exports.CountryISO.Niue,
                    '683'
                ],
                [
                    'Norfolk Island',
                    exports.CountryISO.NorfolkIsland,
                    '672'
                ],
                [
                    'North Korea (조선 민주주의 인민 공화국)',
                    exports.CountryISO.NorthKorea,
                    '850'
                ],
                [
                    'Northern Mariana Islands',
                    exports.CountryISO.NorthernMarianaIslands,
                    '1670'
                ],
                [
                    'Norway (Norge)',
                    exports.CountryISO.Norway,
                    '47',
                    0
                ],
                [
                    'Oman (‫عُمان‬‎)',
                    exports.CountryISO.Oman,
                    '968'
                ],
                [
                    'Pakistan (‫پاکستان‬‎)',
                    exports.CountryISO.Pakistan,
                    '92'
                ],
                [
                    'Palau',
                    exports.CountryISO.Palau,
                    '680'
                ],
                [
                    'Palestine (‫فلسطين‬‎)',
                    exports.CountryISO.Palestine,
                    '970'
                ],
                [
                    'Panama (Panamá)',
                    exports.CountryISO.Panama,
                    '507'
                ],
                [
                    'Papua New Guinea',
                    exports.CountryISO.PapuaNewGuinea,
                    '675'
                ],
                [
                    'Paraguay',
                    exports.CountryISO.Paraguay,
                    '595'
                ],
                [
                    'Peru (Perú)',
                    exports.CountryISO.Peru,
                    '51'
                ],
                [
                    'Philippines',
                    exports.CountryISO.Philippines,
                    '63'
                ],
                [
                    'Poland (Polska)',
                    exports.CountryISO.Poland,
                    '48'
                ],
                [
                    'Portugal',
                    exports.CountryISO.Portugal,
                    '351'
                ],
                [
                    'Puerto Rico',
                    exports.CountryISO.PuertoRico,
                    '1',
                    3,
                    ['787', '939']
                ],
                [
                    'Qatar (‫قطر‬‎)',
                    exports.CountryISO.Qatar,
                    '974'
                ],
                [
                    'Réunion (La Réunion)',
                    exports.CountryISO.Réunion,
                    '262',
                    0
                ],
                [
                    'Romania (România)',
                    exports.CountryISO.Romania,
                    '40'
                ],
                [
                    'Russia (Россия)',
                    exports.CountryISO.Russia,
                    '7',
                    0
                ],
                [
                    'Rwanda',
                    exports.CountryISO.Rwanda,
                    '250'
                ],
                [
                    'Saint Barthélemy (Saint-Barthélemy)',
                    exports.CountryISO.SaintBarthélemy,
                    '590',
                    1
                ],
                [
                    'Saint Helena',
                    exports.CountryISO.SaintHelena,
                    '290'
                ],
                [
                    'Saint Kitts and Nevis',
                    exports.CountryISO.SaintKittsAndNevis,
                    '1869'
                ],
                [
                    'Saint Lucia',
                    'lc',
                    '1',
                    1,
                    [
                        '758',
                    ]
                ],
                [
                    'Saint Martin (Saint-Martin (partie française))',
                    exports.CountryISO.SaintMartin,
                    '590',
                    2
                ],
                [
                    'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
                    exports.CountryISO.SaintPierreAndMiquelon,
                    '508'
                ],
                [
                    'Saint Vincent and the Grenadines',
                    'vc',
                    '1',
                    1,
                    [
                        '784',
                    ]
                ],
                [
                    'Samoa',
                    exports.CountryISO.Samoa,
                    '685'
                ],
                [
                    'San Marino',
                    exports.CountryISO.SanMarino,
                    '378'
                ],
                [
                    'São Tomé and Príncipe (São Tomé e Príncipe)',
                    exports.CountryISO.SãoToméAndPríncipe,
                    '239'
                ],
                [
                    'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
                    exports.CountryISO.SaudiArabia,
                    '966'
                ],
                [
                    'Senegal (Sénégal)',
                    exports.CountryISO.Senegal,
                    '221'
                ],
                [
                    'Serbia (Србија)',
                    exports.CountryISO.Serbia,
                    '381'
                ],
                [
                    'Seychelles',
                    exports.CountryISO.Seychelles,
                    '248'
                ],
                [
                    'Sierra Leone',
                    exports.CountryISO.SierraLeone,
                    '232'
                ],
                [
                    'Singapore',
                    exports.CountryISO.Singapore,
                    '65'
                ],
                [
                    'Sint Maarten',
                    'sx',
                    '1',
                    1,
                    [
                        '721',
                    ]
                ],
                [
                    'Slovakia (Slovensko)',
                    exports.CountryISO.Slovakia,
                    '421'
                ],
                [
                    'Slovenia (Slovenija)',
                    exports.CountryISO.Slovenia,
                    '386'
                ],
                [
                    'Solomon Islands',
                    exports.CountryISO.SolomonIslands,
                    '677'
                ],
                [
                    'Somalia (Soomaaliya)',
                    exports.CountryISO.Somalia,
                    '252'
                ],
                [
                    'South Africa',
                    exports.CountryISO.SouthAfrica,
                    '27'
                ],
                [
                    'South Korea (대한민국)',
                    exports.CountryISO.SouthKorea,
                    '82'
                ],
                [
                    'South Sudan (‫جنوب السودان‬‎)',
                    exports.CountryISO.SouthSudan,
                    '211'
                ],
                [
                    'Spain (España)',
                    exports.CountryISO.Spain,
                    '34'
                ],
                [
                    'Sri Lanka (ශ්‍රී ලංකාව)',
                    exports.CountryISO.SriLanka,
                    '94'
                ],
                [
                    'Sudan (‫السودان‬‎)',
                    exports.CountryISO.Sudan,
                    '249'
                ],
                [
                    'Suriname',
                    exports.CountryISO.Suriname,
                    '597'
                ],
                [
                    'Svalbard and Jan Mayen',
                    exports.CountryISO.SvalbardAndJanMayen,
                    '47',
                    1
                ],
                [
                    'Swaziland',
                    exports.CountryISO.Swaziland,
                    '268'
                ],
                [
                    'Sweden (Sverige)',
                    exports.CountryISO.Sweden,
                    '46'
                ],
                [
                    'Switzerland (Schweiz)',
                    exports.CountryISO.Switzerland,
                    '41'
                ],
                [
                    'Syria (‫سوريا‬‎)',
                    exports.CountryISO.Syria,
                    '963'
                ],
                [
                    'Taiwan (台灣)',
                    exports.CountryISO.Taiwan,
                    '886'
                ],
                [
                    'Tajikistan',
                    exports.CountryISO.Tajikistan,
                    '992'
                ],
                [
                    'Tanzania',
                    exports.CountryISO.Tanzania,
                    '255'
                ],
                [
                    'Thailand (ไทย)',
                    exports.CountryISO.Thailand,
                    '66'
                ],
                [
                    'Timor-Leste',
                    exports.CountryISO.TimorLeste,
                    '670'
                ],
                [
                    'Togo',
                    exports.CountryISO.Togo,
                    '228'
                ],
                [
                    'Tokelau',
                    exports.CountryISO.Tokelau,
                    '690'
                ],
                [
                    'Tonga',
                    exports.CountryISO.Tonga,
                    '676'
                ],
                [
                    'Trinidad and Tobago',
                    'tt',
                    '1',
                    1,
                    [
                        '868',
                    ]
                ],
                [
                    'Tunisia (‫تونس‬‎)',
                    exports.CountryISO.Tunisia,
                    '216'
                ],
                [
                    'Turkey (Türkiye)',
                    exports.CountryISO.Turkey,
                    '90'
                ],
                [
                    'Turkmenistan',
                    exports.CountryISO.Turkmenistan,
                    '993'
                ],
                [
                    'Turks and Caicos Islands',
                    exports.CountryISO.TurksAndCaicosIslands,
                    '1649'
                ],
                [
                    'Tuvalu',
                    exports.CountryISO.Tuvalu,
                    '688'
                ],
                [
                    'U.S. Virgin Islands',
                    'vi',
                    '1',
                    1,
                    [
                        '340',
                    ]
                ],
                [
                    'Uganda',
                    exports.CountryISO.Uganda,
                    '256'
                ],
                [
                    'Ukraine (Україна)',
                    exports.CountryISO.Ukraine,
                    '380'
                ],
                [
                    'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
                    exports.CountryISO.UnitedArabEmirates,
                    '971'
                ],
                [
                    'United Kingdom',
                    exports.CountryISO.UnitedKingdom,
                    '44',
                    0
                ],
                [
                    'United States',
                    exports.CountryISO.UnitedStates,
                    '1',
                    0
                ],
                [
                    'Uruguay',
                    exports.CountryISO.Uruguay,
                    '598'
                ],
                [
                    'Uzbekistan (Oʻzbekiston)',
                    exports.CountryISO.Uzbekistan,
                    '998'
                ],
                [
                    'Vanuatu',
                    exports.CountryISO.Vanuatu,
                    '678'
                ],
                [
                    'Vatican City (Città del Vaticano)',
                    exports.CountryISO.VaticanCity,
                    '39',
                    1
                ],
                [
                    'Venezuela',
                    exports.CountryISO.Venezuela,
                    '58'
                ],
                [
                    'Vietnam (Việt Nam)',
                    exports.CountryISO.Vietnam,
                    '84'
                ],
                [
                    'Wallis and Futuna',
                    exports.CountryISO.WallisAndFutuna,
                    '681'
                ],
                [
                    'Western Sahara (‫الصحراء الغربية‬‎)',
                    exports.CountryISO.WesternSahara,
                    '212',
                    1
                ],
                [
                    'Yemen (‫اليمن‬‎)',
                    exports.CountryISO.Yemen,
                    '967'
                ],
                [
                    'Zambia',
                    exports.CountryISO.Zambia,
                    '260'
                ],
                [
                    'Zimbabwe',
                    exports.CountryISO.Zimbabwe,
                    '263'
                ],
                [
                    'Åland Islands',
                    exports.CountryISO.ÅlandIslands,
                    '358',
                    1
                ]
            ];
        }
        return CountryCode;
    }());
    CountryCode.decorators = [
        { type: core.Injectable }
    ];

    (function (SearchCountryField) {
        SearchCountryField["DialCode"] = "dialCode";
        SearchCountryField["Iso2"] = "iso2";
        SearchCountryField["Name"] = "name";
        SearchCountryField["All"] = "all";
    })(exports.SearchCountryField || (exports.SearchCountryField = {}));

    /*
    We use "control: any" instead of "control: FormControl" to silence:
    "Property 'nativeElement' does not exist on type 'FormControl'".
    This happens because I've expanded control with nativeElement via
    'NativeElementInjectorDirective' to get an access to the element.
    More about this approach and reasons for this:
    https://github.com/angular/angular/issues/18025
    https://stackoverflow.com/a/54075119/1617590
    */
    var phoneNumberValidator = function (control) {
        if (!control.value) {
            return;
        }
        // Find <input> inside injected nativeElement and get its "id".
        var el = control.nativeElement;
        var inputBox = el
            ? el.querySelector('input[type="tel"]')
            : undefined;
        if (inputBox) {
            var id = inputBox.id;
            var isCheckValidation = inputBox.getAttribute('validation');
            if (isCheckValidation === 'true') {
                var isRequired = control.errors && control.errors.required === true;
                var error = { validatePhoneNumber: { valid: false } };
                inputBox.setCustomValidity('Invalid field.');
                var number = void 0;
                try {
                    number = lpn.PhoneNumberUtil.getInstance().parse(control.value.number, control.value.countryCode);
                }
                catch (e) {
                    if (isRequired === true) {
                        return error;
                    }
                    else {
                        inputBox.setCustomValidity('');
                    }
                }
                if (control.value) {
                    if (!number) {
                        return error;
                    }
                    else {
                        if (!lpn.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, control.value.countryCode)) {
                            return error;
                        }
                        else {
                            inputBox.setCustomValidity('');
                        }
                    }
                }
            }
            else if (isCheckValidation === 'false') {
                inputBox.setCustomValidity('');
                control.clearValidators();
            }
        }
        return;
    };

    var ɵ0 = phoneNumberValidator;
    var NgxIntlTelInputComponent = /** @class */ (function () {
        function NgxIntlTelInputComponent(countryCodeData) {
            this.countryCodeData = countryCodeData;
            this.value = '';
            this.preferredCountries = [];
            this.enablePlaceholder = true;
            this.cssClass = 'form-control';
            this.onlyCountries = [];
            this.enableAutoCountrySelect = true;
            this.searchCountryFlag = false;
            this.searchCountryField = [exports.SearchCountryField.All];
            this.searchCountryPlaceholder = 'Search Country';
            this.maxLength = '';
            this.selectFirstCountry = true;
            this.phoneValidation = true;
            this.inputId = 'phone';
            this.separateDialCode = false;
            this.countryChange = new core.EventEmitter();
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
            this.onTouched = function () { };
            this.propagateChange = function (_) { };
        }
        NgxIntlTelInputComponent.prototype.ngOnInit = function () {
            this.init();
        };
        NgxIntlTelInputComponent.prototype.ngOnChanges = function (changes) {
            var selectedISO = changes['selectedCountryISO'];
            if (this.allCountries &&
                selectedISO &&
                selectedISO.currentValue !== selectedISO.previousValue) {
                this.getSelectedCountry();
            }
            if (changes.preferredCountries) {
                this.getPreferredCountries();
            }
            this.checkSeparateDialCodeStyle();
        };
        /*
            This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
            Ref: http://codelyzer.com/rules/no-life-cycle-call/
        */
        NgxIntlTelInputComponent.prototype.init = function () {
            var _this = this;
            this.fetchCountryData();
            if (this.preferredCountries.length) {
                this.getPreferredCountries();
            }
            if (this.onlyCountries.length) {
                this.allCountries = this.allCountries.filter(function (c) { return _this.onlyCountries.includes(c.iso2); });
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
        };
        NgxIntlTelInputComponent.prototype.getPreferredCountries = function () {
            var _this = this;
            if (this.preferredCountries.length) {
                this.preferredCountriesInDropDown = [];
                this.preferredCountries.forEach(function (iso2) {
                    var preferredCountry = _this.allCountries.filter(function (c) {
                        return c.iso2 === iso2;
                    });
                    _this.preferredCountriesInDropDown.push(preferredCountry[0]);
                });
            }
        };
        NgxIntlTelInputComponent.prototype.getSelectedCountry = function () {
            var _this = this;
            if (this.selectedCountryISO) {
                this.selectedCountry = this.allCountries.find(function (c) {
                    return c.iso2.toLowerCase() === _this.selectedCountryISO.toLowerCase();
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
        };
        NgxIntlTelInputComponent.prototype.setSelectedCountry = function (country) {
            this.selectedCountry = country;
            this.countryChange.emit(country);
        };
        /**
         * Search country based on country name, iso2, dialCode or all of them.
         */
        NgxIntlTelInputComponent.prototype.searchCountry = function () {
            var _this = this;
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
            var countrySearchTextLower = this.countrySearchText.toLowerCase();
            var country = this.allCountries.filter(function (c) {
                if (_this.searchCountryField.indexOf(exports.SearchCountryField.All) > -1) {
                    // Search in all fields
                    if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                    if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                    if (c.dialCode.startsWith(_this.countrySearchText)) {
                        return c;
                    }
                }
                else {
                    // Or search by specific SearchCountryField(s)
                    if (_this.searchCountryField.indexOf(exports.SearchCountryField.Iso2) > -1) {
                        if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                            return c;
                        }
                    }
                    if (_this.searchCountryField.indexOf(exports.SearchCountryField.Name) > -1) {
                        if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                            return c;
                        }
                    }
                    if (_this.searchCountryField.indexOf(exports.SearchCountryField.DialCode) > -1) {
                        if (c.dialCode.startsWith(_this.countrySearchText)) {
                            return c;
                        }
                    }
                }
            });
            if (country.length > 0) {
                var el = this.countryList.nativeElement.querySelector('#' + country[0].htmlId);
                if (el) {
                    el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'nearest',
                    });
                }
            }
            this.checkSeparateDialCodeStyle();
        };
        NgxIntlTelInputComponent.prototype.onPhoneNumberChange = function () {
            var countryCode;
            // Handle the case where the user sets the value programatically based on a persisted ChangeData obj.
            if (this.phoneNumber && typeof this.phoneNumber === 'object') {
                var numberObj = this.phoneNumber;
                this.phoneNumber = numberObj.number;
                countryCode = numberObj.countryCode;
            }
            this.value = this.phoneNumber;
            countryCode = countryCode || this.selectedCountry.iso2.toUpperCase();
            var number;
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
                    var newCountry = this.allCountries.sort(function (a, b) {
                        return a.priority - b.priority;
                    }).find(function (c) { return c.iso2 === countryCode; });
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
                var intlNo = number
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
        };
        NgxIntlTelInputComponent.prototype.onCountrySelect = function (country, el) {
            this.setSelectedCountry(country);
            this.checkSeparateDialCodeStyle();
            if (this.phoneNumber && this.phoneNumber.length > 0) {
                this.value = this.phoneNumber;
                var number = void 0;
                try {
                    number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
                }
                catch (e) { }
                var intlNo = number
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
        };
        NgxIntlTelInputComponent.prototype.onInputKeyPress = function (event) {
            var allowedChars = /[0-9\+\-\ ]/;
            var allowedCtrlChars = /[axcv]/; // Allows copy-pasting
            var allowedOtherKeys = [
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
        };
        NgxIntlTelInputComponent.prototype.fetchCountryData = function () {
            var _this = this;
            /* Clearing the list to avoid duplicates (https://github.com/webcat12345/ngx-intl-tel-input/issues/248) */
            this.allCountries = [];
            this.countryCodeData.allCountries.forEach(function (c) {
                var country = {
                    name: c[0].toString(),
                    iso2: c[1].toString(),
                    dialCode: c[2].toString(),
                    priority: +c[3] || 0,
                    areaCodes: c[4] || undefined,
                    htmlId: "iti-0__item-" + c[1].toString(),
                    flagClass: "iti__" + c[1].toString().toLocaleLowerCase(),
                    placeHolder: '',
                };
                if (_this.enablePlaceholder) {
                    country.placeHolder = _this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
                }
                _this.allCountries.push(country);
            });
        };
        NgxIntlTelInputComponent.prototype.getPhoneNumberPlaceHolder = function (countryCode) {
            try {
                return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
            }
            catch (e) {
                return e;
            }
        };
        NgxIntlTelInputComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        NgxIntlTelInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        NgxIntlTelInputComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        NgxIntlTelInputComponent.prototype.writeValue = function (obj) {
            var _this = this;
            if (obj === undefined) {
                this.init();
            }
            this.phoneNumber = obj;
            setTimeout(function () {
                _this.onPhoneNumberChange();
            }, 1);
        };
        NgxIntlTelInputComponent.prototype.getCountryIsoCode = function (countryCode, number) {
            // Will use this to match area code from the first numbers
            var rawNumber = number['values_']['2'].toString();
            // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
            var countries = this.allCountries.filter(function (c) { return c.dialCode === countryCode.toString(); });
            // Main country is the country, which has no areaCodes specified in country-code.ts file.
            var mainCountry = countries.find(function (c) { return c.areaCodes === undefined; });
            // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
            var secondaryCountries = countries.filter(function (c) { return c.areaCodes !== undefined; });
            var matchedCountry = mainCountry ? mainCountry.iso2 : undefined;
            /*
                Iterate over each secondary country and check if nationalNumber starts with any of areaCodes available.
                If no matches found, fallback to the main country.
            */
            secondaryCountries.forEach(function (country) {
                country.areaCodes.forEach(function (areaCode) {
                    if (rawNumber.startsWith(areaCode)) {
                        matchedCountry = country.iso2;
                    }
                });
            });
            return matchedCountry;
        };
        NgxIntlTelInputComponent.prototype.separateDialCodePlaceHolder = function (placeholder) {
            return this.removeDialCode(placeholder);
        };
        NgxIntlTelInputComponent.prototype.removeDialCode = function (phoneNumber) {
            if (this.separateDialCode && phoneNumber) {
                phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
            }
            return phoneNumber;
        };
        // adjust input alignment
        NgxIntlTelInputComponent.prototype.checkSeparateDialCodeStyle = function () {
            if (this.separateDialCode && this.selectedCountry) {
                var cntryCd = this.selectedCountry.dialCode;
                this.separateDialCodeClass =
                    'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
            }
            else {
                this.separateDialCodeClass = '';
            }
        };
        return NgxIntlTelInputComponent;
    }());
    NgxIntlTelInputComponent.decorators = [
        { type: core.Component, args: [{
                    // tslint:disable-next-line: component-selector
                    selector: 'ngx-intl-tel-input',
                    template: "<div class=\"iti iti--allow-dropdown\"\n\t[ngClass]=\"separateDialCodeClass\">\n\t<div class=\"iti__flag-container\"\n\t\tdropdown\n\t\t[ngClass]=\"{'disabled': disabled}\"\n\t\t[isDisabled]=\"disabled\">\n\t\t<div class=\"iti__selected-flag dropdown-toggle\"\n\t\t\tdropdownToggle>\n\t\t\t<div class=\"iti__flag\"\n\t\t\t\t[ngClass]=\"selectedCountry?.flagClass\"\n\t\t\t\t[tooltip]=\"selectedCountry ? selectedCountry[tooltipField] : ''\"></div>\n\t\t\t<div *ngIf=\"separateDialCode\"\n\t\t\t\tclass=\"selected-dial-code\">+{{selectedCountry.dialCode}}</div>\n\t\t\t<div class=\"iti__arrow\"></div>\n\t\t</div>\n\t\t<div *dropdownMenu\n\t\t\tclass=\"dropdown-menu country-dropdown\">\n\t\t\t<div class=\"search-container\"\n\t\t\t\t*ngIf=\"searchCountryFlag && searchCountryField\">\n\t\t\t\t<input id=\"country-search-box\"\n\t\t\t\t\t[(ngModel)]=\"countrySearchText\"\n\t\t\t\t\t(keyup)=\"searchCountry()\"\n\t\t\t\t\t(click)=\"$event.stopPropagation()\"\n\t\t\t\t\t[placeholder]=\"searchCountryPlaceholder\"\n\t\t\t\t\tautofocus>\n\t\t\t</div>\n\t\t\t<ul class=\"iti__country-list\"\n\t\t\t\t#countryList>\n\t\t\t\t<li class=\"iti__country iti__preferred\"\n\t\t\t\t\t*ngFor=\"let country of preferredCountriesInDropDown\"\n\t\t\t\t\t(click)=\"onCountrySelect(country, focusable)\"\n\t\t\t\t\t[id]=\"country.htmlId+'-preferred'\">\n\t\t\t\t\t<div class=\"iti__flag-box\">\n\t\t\t\t\t\t<div class=\"iti__flag\"\n\t\t\t\t\t\t\t[ngClass]=\"country.flagClass\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"iti__country-name\">{{country.name}}</span>\n\t\t\t\t\t<span class=\"iti__dial-code\">+{{country.dialCode}}</span>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"iti__divider\"\n\t\t\t\t\t*ngIf=\"preferredCountriesInDropDown?.length\"></li>\n\t\t\t\t<li class=\"iti__country iti__standard\"\n\t\t\t\t\t*ngFor=\"let country of allCountries\"\n\t\t\t\t\t(click)=\"onCountrySelect(country, focusable)\"\n\t\t\t\t\t[id]=\"country.htmlId\">\n\t\t\t\t\t<div class=\"iti__flag-box\">\n\t\t\t\t\t\t<div class=\"iti__flag\"\n\t\t\t\t\t\t\t[ngClass]=\"country.flagClass\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"iti__country-name\">{{country.name}}</span>\n\t\t\t\t\t<span class=\"iti__dial-code\">+{{country.dialCode}}</span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t<input type=\"tel\"\n\t\t[id]=\"inputId\"\n\t\tautocomplete=\"off\"\n\t\t[ngClass]=\"cssClass\"\n\t\t(blur)=\"onTouched()\"\n\t\t(keypress)=\"onInputKeyPress($event)\"\n\t\t[(ngModel)]=\"phoneNumber\"\n\t\t(ngModelChange)=\"onPhoneNumberChange()\"\n\t\t[disabled]=\"disabled\"\n\t\t[placeholder]=\"separateDialCodePlaceHolder(selectedCountry?.placeHolder || '')\"\n\t\t[attr.maxLength]=\"maxLength\"\n\t\t[attr.validation]=\"phoneValidation\"\n\t\t#focusable>\n</div>",
                    providers: [
                        CountryCode,
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core.forwardRef(function () { return NgxIntlTelInputComponent; }),
                            multi: true,
                        },
                        {
                            provide: forms.NG_VALIDATORS,
                            useValue: ɵ0,
                            multi: true,
                        },
                    ],
                    styles: ["li.iti__country:hover{background-color:rgba(0,0,0,.05)}.iti__selected-flag.dropdown-toggle:after{content:none}.iti__flag-container.disabled{cursor:default!important}.iti.iti--allow-dropdown .flag-container.disabled:hover .iti__selected-flag{background:none}.country-dropdown{border:1px solid #ccc;border-collapse:collapse;padding:1px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.search-container{position:relative}.search-container input{border:none;border-bottom:1px solid #ccc;padding-left:10px;width:100%}.search-icon{margin:1px 10px;position:absolute;width:25px;z-index:2}.iti__country-list{border:none;position:relative}.iti input#country-search-box{padding-left:6px}.iti .selected-dial-code{margin-left:6px}.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2 .iti__selected-flag,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3 .iti__selected-flag,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4 .iti__selected-flag,.iti.separate-dial-code .iti__selected-flag{width:93px}.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2 input,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3 input,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4 input,.iti.separate-dial-code input{padding-left:98px}"]
                },] }
    ];
    NgxIntlTelInputComponent.ctorParameters = function () { return [
        { type: CountryCode }
    ]; };
    NgxIntlTelInputComponent.propDecorators = {
        value: [{ type: core.Input }],
        preferredCountries: [{ type: core.Input }],
        enablePlaceholder: [{ type: core.Input }],
        cssClass: [{ type: core.Input }],
        onlyCountries: [{ type: core.Input }],
        enableAutoCountrySelect: [{ type: core.Input }],
        searchCountryFlag: [{ type: core.Input }],
        searchCountryField: [{ type: core.Input }],
        searchCountryPlaceholder: [{ type: core.Input }],
        maxLength: [{ type: core.Input }],
        tooltipField: [{ type: core.Input }],
        selectFirstCountry: [{ type: core.Input }],
        selectedCountryISO: [{ type: core.Input }],
        phoneValidation: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        separateDialCode: [{ type: core.Input }],
        countryChange: [{ type: core.Output }],
        countryList: [{ type: core.ViewChild, args: ['countryList',] }]
    };

    /*
    "Property 'nativeElement' does not exist on type 'FormControl'".
    'NativeElementInjectorDirective' injects nativeElement to each control,
    so we can access it from inside validator for example.
    More about this approach and reasons for this:
    https://github.com/angular/angular/issues/18025
    https://stackoverflow.com/a/54075119/1617590
    */
    var NativeElementInjectorDirective = /** @class */ (function () {
        function NativeElementInjectorDirective(controlDir, host) {
            this.controlDir = controlDir;
            this.host = host;
        }
        NativeElementInjectorDirective.prototype.ngOnInit = function () {
            if (this.controlDir.control) {
                this.controlDir.control['nativeElement'] = this.host.nativeElement;
            }
        };
        return NativeElementInjectorDirective;
    }());
    NativeElementInjectorDirective.decorators = [
        { type: core.Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[ngModel], [formControl], [formControlName]',
                },] }
    ];
    NativeElementInjectorDirective.ctorParameters = function () { return [
        { type: forms.NgControl },
        { type: core.ElementRef }
    ]; };

    var dropdownModuleForRoot = dropdown.BsDropdownModule.forRoot();
    var tooltipModuleForRoot = tooltip.TooltipModule.forRoot();
    var NgxIntlTelInputModule = /** @class */ (function () {
        function NgxIntlTelInputModule() {
        }
        return NgxIntlTelInputModule;
    }());
    NgxIntlTelInputModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [NgxIntlTelInputComponent, NativeElementInjectorDirective],
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        dropdownModuleForRoot,
                        tooltipModuleForRoot,
                    ],
                    exports: [NgxIntlTelInputComponent, NativeElementInjectorDirective],
                },] }
    ];

    (function (TooltipLabel) {
        TooltipLabel["Name"] = "name";
        TooltipLabel["Iso2"] = "iso2";
    })(exports.TooltipLabel || (exports.TooltipLabel = {}));

    /*
     * Public API Surface of ngx-intl-tel-input
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NativeElementInjectorDirective = NativeElementInjectorDirective;
    exports.NgxIntlTelInputComponent = NgxIntlTelInputComponent;
    exports.NgxIntlTelInputModule = NgxIntlTelInputModule;
    exports.dropdownModuleForRoot = dropdownModuleForRoot;
    exports.tooltipModuleForRoot = tooltipModuleForRoot;
    exports.ɵ0 = ɵ0;
    exports.ɵa = CountryCode;
    exports.ɵb = phoneNumberValidator;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-intl-tel-input.umd.js.map
