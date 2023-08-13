import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
/*
"Property 'nativeElement' does not exist on type 'FormControl'".
'NativeElementInjectorDirective' injects nativeElement to each control,
so we can access it from inside validator for example.
More about this approach and reasons for this:
https://github.com/angular/angular/issues/18025
https://stackoverflow.com/a/54075119/1617590
*/
export class NativeElementInjectorDirective {
    constructor(controlDir, host) {
        this.controlDir = controlDir;
        this.host = host;
    }
    ngOnInit() {
        if (this.controlDir.control) {
            this.controlDir.control['nativeElement'] = this.host.nativeElement;
        }
    }
}
NativeElementInjectorDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[ngModel], [formControl], [formControlName]',
            },] }
];
NativeElementInjectorDirective.ctorParameters = () => [
    { type: NgControl },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWVsZW1lbnQtaW5qZWN0b3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWludGwtdGVsLWlucHV0L3NyYy9saWIvZGlyZWN0aXZlcy9uYXRpdmUtZWxlbWVudC1pbmplY3Rvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDOzs7Ozs7O0VBT0U7QUFLRixNQUFNLE9BQU8sOEJBQThCO0lBQzFDLFlBQ1MsVUFBcUIsRUFDckIsSUFBaUM7UUFEakMsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixTQUFJLEdBQUosSUFBSSxDQUE2QjtJQUN2QyxDQUFDO0lBQ0osUUFBUTtRQUNQLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDbkU7SUFDRixDQUFDOzs7WUFiRCxTQUFTLFNBQUM7Z0JBQ1YsK0NBQStDO2dCQUMvQyxRQUFRLEVBQUUsNkNBQTZDO2FBQ3ZEOzs7WUFiUSxTQUFTO1lBREUsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qXG5cIlByb3BlcnR5ICduYXRpdmVFbGVtZW50JyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlICdGb3JtQ29udHJvbCdcIi5cbidOYXRpdmVFbGVtZW50SW5qZWN0b3JEaXJlY3RpdmUnIGluamVjdHMgbmF0aXZlRWxlbWVudCB0byBlYWNoIGNvbnRyb2wsXG5zbyB3ZSBjYW4gYWNjZXNzIGl0IGZyb20gaW5zaWRlIHZhbGlkYXRvciBmb3IgZXhhbXBsZS5cbk1vcmUgYWJvdXQgdGhpcyBhcHByb2FjaCBhbmQgcmVhc29ucyBmb3IgdGhpczpcbmh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MDI1XG5odHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTQwNzUxMTkvMTYxNzU5MFxuKi9cbkBEaXJlY3RpdmUoe1xuXHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuXHRzZWxlY3RvcjogJ1tuZ01vZGVsXSwgW2Zvcm1Db250cm9sXSwgW2Zvcm1Db250cm9sTmFtZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVFbGVtZW50SW5qZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGNvbnRyb2xEaXI6IE5nQ29udHJvbCxcblx0XHRwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEZvcm1FbGVtZW50PlxuXHQpIHt9XG5cdG5nT25Jbml0KCkge1xuXHRcdGlmICh0aGlzLmNvbnRyb2xEaXIuY29udHJvbCkge1xuXHRcdFx0dGhpcy5jb250cm9sRGlyLmNvbnRyb2xbJ25hdGl2ZUVsZW1lbnQnXSA9IHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50O1xuXHRcdH1cblx0fVxufVxuIl19