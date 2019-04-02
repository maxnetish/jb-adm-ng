import {Component, OnInit, Input, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JbFileUploadResponse} from '../../resources/file/jb-file-upload-response';
import {JbUploadedFileInfo} from '../../resources/file/jb-uploaded-file-info';

@Component({
    selector: 'jb-adm-upload-file-component',
    templateUrl: './upload-file-dialog.component.html'
})
export class UploadFileComponent implements OnInit {

    @Input()
    postId: string;

    FileEditForm: FormGroup = this.fb.group({
        description: [null],
        // FIXME such binding didn't work because angular lacks support of <input type="file">
        file: [null, Validators.required]
    });
    waiting: false;

    onSubmit(formValue) {
        console.info(formValue);
        this.activeModal.close(true);
    }

    constructor(
        private fb: FormBuilder,
        private activeModal: NgbActiveModal
    ) {
    }

    ngOnInit() {

    }
}

@Injectable({
    providedIn: 'root'
})
export class UploadFileModal {

    show({postId = null}: { postId?: string } = {}): Promise<JbUploadedFileInfo> {
        const modalRef = this.modalService.open(UploadFileComponent);
        modalRef.componentInstance.postId = postId;
        return modalRef.result;
    }

    constructor(
        private modalService: NgbModal
    ) {
    }
}
