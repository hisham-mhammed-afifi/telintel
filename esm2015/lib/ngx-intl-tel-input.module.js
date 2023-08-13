import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeElementInjectorDirective } from './directives/native-element-injector.directive';
import { NgxIntlTelInputComponent } from './ngx-intl-tel-input.component';
export const dropdownModuleForRoot = BsDropdownModule.forRoot();
export const tooltipModuleForRoot = TooltipModule.forRoot();
export class NgxIntlTelInputModule {
}
NgxIntlTelInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxIntlTelInputComponent, NativeElementInjectorDirective],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    dropdownModuleForRoot,
                    tooltipModuleForRoot,
                ],
                exports: [NgxIntlTelInputComponent, NativeElementInjectorDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFMUUsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQTBDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3ZHLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUF1QyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7QUFhaEcsTUFBTSxPQUFPLHFCQUFxQjs7O1lBWGpDLFFBQVEsU0FBQztnQkFDVCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSw4QkFBOEIsQ0FBQztnQkFDeEUsT0FBTyxFQUFFO29CQUNSLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUNuQjtnQkFDRixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSw4QkFBOEIsQ0FBQzthQUNuRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJzRHJvcGRvd25Nb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOYXRpdmVFbGVtZW50SW5qZWN0b3JEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF0aXZlLWVsZW1lbnQtaW5qZWN0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neEludGxUZWxJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93bk1vZHVsZUZvclJvb3Q6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnNEcm9wZG93bk1vZHVsZT4gPSBCc0Ryb3Bkb3duTW9kdWxlLmZvclJvb3QoKTtcbmV4cG9ydCBjb25zdCB0b29sdGlwTW9kdWxlRm9yUm9vdDogTW9kdWxlV2l0aFByb3ZpZGVyczxUb29sdGlwTW9kdWxlPiA9IFRvb2x0aXBNb2R1bGUuZm9yUm9vdCgpO1xuXG5ATmdNb2R1bGUoe1xuXHRkZWNsYXJhdGlvbnM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQsIE5hdGl2ZUVsZW1lbnRJbmplY3RvckRpcmVjdGl2ZV0sXG5cdGltcG9ydHM6IFtcblx0XHRDb21tb25Nb2R1bGUsXG5cdFx0Rm9ybXNNb2R1bGUsXG5cdFx0UmVhY3RpdmVGb3Jtc01vZHVsZSxcblx0XHRkcm9wZG93bk1vZHVsZUZvclJvb3QsXG5cdFx0dG9vbHRpcE1vZHVsZUZvclJvb3QsXG4gIF0sXG5cdGV4cG9ydHM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQsIE5hdGl2ZUVsZW1lbnRJbmplY3RvckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5neEludGxUZWxJbnB1dE1vZHVsZSB7XG5cbn1cbiJdfQ==