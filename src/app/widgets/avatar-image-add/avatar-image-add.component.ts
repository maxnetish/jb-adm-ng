import {Component, Injectable, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CropData, CroppieOptions} from 'croppie';
import * as Croppie from 'croppie';
import {AbstractControl, FormBuilder, ValidatorFn} from '@angular/forms';
import {FileStoreService} from '../../resources/file/file-store.service';
import {JbFileAddModel} from '../../resources/file/jb-file-add-model';
import {JbFileUploadResponse} from '../../resources/file/jb-file-upload-response';
import {JbFileInfo} from '../../resources/file/jb-file-info';


@Component({
    selector: 'jb-adm-avatar-image-add',
    templateUrl: './avatar-image-add.component.html',
    styleUrls: ['./avatar-image-add.component.less']
})
export class AvatarImageAddComponent {

    @Input() croppieOptions: CroppieOptions;

    private readonly AvatarEditForm = this.fb.group({
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

    onCroppieChanged(croppieData: CropData, croppieInstance: Croppie) {
        console.info(croppieData, croppieInstance);
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
                const uploadModel: JbFileAddModel = {
                    originalFilename: formValue.cropper.fileName,
                    context: fsContext,
                    metadata: {
                        height: 100,
                        width: 100,
                        description: formValue.description
                    },
                    blob
                };
                return this.fileStoreService.uploadFromBlob(uploadModel).toPromise<JbFileUploadResponse>();
            })
            .then(result => {
                this.waiting = false;
                this.activeModal.close(result.files[fsContext][0]);
            })
            .then(null, err => {
                this.waiting = false;
                console.warn(err);
            });
    }

    constructor(
        private activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private fileStoreService: FileStoreService
    ) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class AvatarImageAddModal {
    /**
     * To show AvatarImageAddComponent as modal
     */
    show({croppieOptions = null}: { croppieOptions?: CroppieOptions } = {}): Promise<JbFileInfo> {
        const modalRef = this.modalService.open(AvatarImageAddComponent);
        // inject options into AvatarImageAddComponent
        modalRef.componentInstance.croppieOptions = croppieOptions;
        return modalRef.result;
    }

    constructor(private modalService: NgbModal) {
    }
}
