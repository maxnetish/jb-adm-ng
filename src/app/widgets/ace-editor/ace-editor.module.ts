import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AceEditorComponent} from './ace-editor.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AceEditorComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        AceEditorComponent,
    ]
})
export class AceEditorModule {
}
