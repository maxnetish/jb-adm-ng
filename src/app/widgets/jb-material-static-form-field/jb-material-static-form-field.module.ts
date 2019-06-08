import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JbMaterialStaticFormFieldComponent} from './jb-material-static-form-field.component';

@NgModule({
    declarations: [
        JbMaterialStaticFormFieldComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        JbMaterialStaticFormFieldComponent,
    ]
})
export class JbMaterialStaticFormFieldModule {
}
