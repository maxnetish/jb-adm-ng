import {Component, OnInit, Input, Injectable, ViewContainerRef, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JbUploadedFileInfo} from '../../resources/file/jb-uploaded-file-info';
import {JbUploadFileModel} from '../../resources/file/jb-upload-file-model';
import {FileStoreService} from '../../resources/file/file-store.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {UploadFileDialogParameters} from './upload-file-dialog-parameters';
import {UploadFileComponentParameters} from './upload-file-component-parameters';

@Component({
    selector: 'jb-adm-upload-file-component',
    templateUrl: './upload-file-dialog.component.html',
    styleUrls: ['./upload-file-dialog.component.less']
})
export class UploadFileComponent {

    @Input()
    postId: string;

    @Input()
    context: string;

    @Input()
    title: string;

    FileEditForm: FormGroup = this.fb.group({
        description: [null],
        files: [null, Validators.required]
    });
    waiting = false;

    onSubmit(formValue) {

        const uploadModel: JbUploadFileModel = {
            context: this.context,
            file: formValue.files[0],
            metadata: {
                postId: this.postId,
                description: formValue.description
            }
        };
        this.waiting = true;
        return this.fileStoreService.upload(uploadModel)
            .toPromise()
            .then(fileUploadResponse => {
                this.waiting = false;
                this.modalRef.close(fileUploadResponse.files[this.context][0]);
            })
            .then(null, err => {
                this.waiting = false;
                console.warn(err);
            });
    }

    constructor(
        private fb: FormBuilder,
        private fileStoreService: FileStoreService,
        public modalRef: MatDialogRef<UploadFileComponent>,
        @Inject(MAT_DIALOG_DATA) private passedData: UploadFileComponentParameters
    ) {
        this.postId = this.passedData.postId;
        this.context = this.passedData.context;
        this.title = this.passedData.title;
    }
}


@Injectable(/*{
    providedIn: 'root'
}*/)
export class UploadFileModal {

    show(
        {
            postId = null,
            context = 'attachment',
            title = 'Add attachment',
            viewContainerRef = null
        }: UploadFileDialogParameters = {}
    )
        : Promise<JbUploadedFileInfo> {

        const modalConfig: MatDialogConfig<UploadFileComponentParameters> = {
            viewContainerRef,
            data: {
                postId,
                context,
                title
            }
        };
        const modalRef = this.matDialog.open<UploadFileComponent, UploadFileComponentParameters, JbUploadedFileInfo>(
            UploadFileComponent,
            modalConfig
        );
        return modalRef.afterClosed().toPromise();
    }

    constructor(
        private matDialog: MatDialog
    ) {
    }
}
