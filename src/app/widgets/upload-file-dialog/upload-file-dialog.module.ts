import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {UploadFileComponent, UploadFileModal} from './upload-file-dialog.component';
import {ContentTypeToIconModule} from '../../utils/content-type-to-icon.pipe';
import {JbFileInputModule} from '../jb-file-input.directive';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        ContentTypeToIconModule,
        MatFormFieldModule,
        MatInputModule,
        JbFileInputModule,
    ],
    declarations: [
        UploadFileComponent,
    ],
    providers: [
        UploadFileModal,
    ],
    entryComponents: [
        UploadFileComponent,
    ]
})
export class UploadFileDialogModule {
}

