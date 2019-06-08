import {NgModule} from '@angular/core';
import {JbCropperComponent} from './jb-cropper.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        JbCropperComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        JbCropperComponent,
    ]
})
export class JbCropperModule {
}
