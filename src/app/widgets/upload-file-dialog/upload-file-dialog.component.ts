import {Component, OnInit, Input, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JbFileUploadResponse} from '../../resources/file/jb-file-upload-response';
import {JbUploadedFileInfo} from '../../resources/file/jb-uploaded-file-info';
import {JbUploadFileModel} from '../../resources/file/jb-upload-file-model';
import {FileStoreService} from '../../resources/file/file-store.service';

@Component({
    selector: 'jb-adm-upload-file-component',
    templateUrl: './upload-file-dialog.component.html'
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
                // this.activeModal.close(fileUploadResponse.files[this.context][0]);
            })
            .then(null, err => {
                this.waiting = false;
                console.warn(err);
            });
    }

    constructor(
        private fb: FormBuilder,
        // private activeModal: NgbActiveModal,
        private fileStoreService: FileStoreService
    ) {
    }
}


@Injectable({
    providedIn: 'root'
})
export class UploadFileModal {

    show({postId = null, context = 'attachment', title = 'Add attachment'}: { postId?: string, context?: string, title?: string } = {})
        : Promise<JbUploadedFileInfo> {
        // const modalRef = this.modalService.open(UploadFileComponent);
        // modalRef.componentInstance.postId = postId;
        // modalRef.componentInstance.context = context;
        // modalRef.componentInstance.title = title;
        // return modalRef.result
        //     .then(null, err => {
        //         if ([ModalDismissReasons.BACKDROP_CLICK, ModalDismissReasons.ESC].indexOf(err) > -1) {
        //             return false;
        //         }
        //         throw err;
        //     });
        return Promise.resolve(null);
    }

    constructor(
        // private modalService: NgbModal
    ) {
    }
}
