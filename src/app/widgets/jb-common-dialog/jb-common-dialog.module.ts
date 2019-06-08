import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {CommonDialogModal, JbCommonDialogComponent} from './jb-common-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
    ],
    declarations: [
        JbCommonDialogComponent,
    ],
    entryComponents: [
        JbCommonDialogComponent
    ],
    providers: [
        CommonDialogModal,
    ]
})
export class JbCommonDialogModule {
}
