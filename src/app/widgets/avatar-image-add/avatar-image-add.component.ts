import {Component, Inject, Injectable, Input, ViewContainerRef} from '@angular/core';
import {CroppieOptions} from 'croppie';
import * as Croppie from 'croppie';
import {AbstractControl, FormBuilder, ValidatorFn} from '@angular/forms';
import {FileStoreService} from '../../resources/file/file-store.service';
import {JbUploadBlobModel} from '../../resources/file/jb-upload-blob-model';
import {JbFileUploadResponse} from '../../resources/file/jb-file-upload-response';
import {JbUploadedFileInfo} from '../../resources/file/jb-uploaded-file-info';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'jb-adm-avatar-image-add',
    templateUrl: './avatar-image-add.component.html',
    styleUrls: ['./avatar-image-add.component.less']
})
export class AvatarImageAddComponent {

    @Input() croppieOptions: CroppieOptions;

    readonly AvatarEditForm = this.fb.group({
        cropper: [{cropData: null, fileName: null}, [this.cropperValidator()]],
        description: [null]
    });

    waiting = false;

    private cropperValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const choosedFileName = control.value && control.value.fileName;
            return choosedFileName ? null : {'fileRequired': {value: control.value}};
        };
    }

    onSubmit(formValue, croppie: Croppie) {
        const fsContext = 'avatarImage';
        this.waiting = true;
        return croppie.result({
                type: 'blob',
                quality: 1,
                format: 'png',
                circle: false,
                size: 'viewport'
            })
            .then(blob => {
                const uploadModel: JbUploadBlobModel = {
                    originalFilename: formValue.cropper.fileName,
                    context: fsContext,
                    metadata: {
                        height: 100,
                        width: 100,
                        description: formValue.description
                    },
                    blob
                };
                return this.fileStoreService.upload(uploadModel).toPromise<JbFileUploadResponse>();
            })
            .then(result => {
                this.waiting = false;
                this.modalRef.close(result.files[fsContext][0]);
            })
            .then(null, err => {
                this.waiting = false;
                console.warn(err);
            });
    }

    constructor(
        public modalRef: MatDialogRef<AvatarImageAddComponent>,
        private fb: FormBuilder,
        private fileStoreService: FileStoreService,
        @Inject(MAT_DIALOG_DATA) private passedData: { croppieOptions?: CroppieOptions }
    ) {
        this.croppieOptions = this.passedData.croppieOptions;
    }
}

@Injectable(/*{
    // providedIn: AvatarImageAddModule,
}*/)
export class AvatarImageAddModal {
    /**
     * To show AvatarImageAddComponent as modal
     */
    show(
        {croppieOptions = null, viewContainerRef = null}: { croppieOptions?: CroppieOptions, viewContainerRef?: ViewContainerRef } = {}
    ): Promise<JbUploadedFileInfo> {

        const modalConfig: MatDialogConfig = {
            data: {
                croppieOptions
            },
            viewContainerRef,
            width: '330px',
        };

        const modalRef = this.matDialog.open<AvatarImageAddComponent, { cropppieOptions?: CroppieOptions }, JbUploadedFileInfo>(
            AvatarImageAddComponent, modalConfig
        );
        return modalRef.afterClosed().toPromise();
    }

    constructor(
        private matDialog: MatDialog
    ) {
    }
}
