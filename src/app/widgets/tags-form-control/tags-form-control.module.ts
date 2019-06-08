import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {TagsFormControlComponent} from './tags-form-control.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
    declarations: [
        TagsFormControlComponent,
    ],
    exports: [
        TagsFormControlComponent,
    ]
})
export class TagsFormControlModule {
}
