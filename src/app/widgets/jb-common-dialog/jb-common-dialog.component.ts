import {Component, Injectable, Input, OnInit} from '@angular/core';
// import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AvatarImageAddComponent} from '../avatar-image-add/avatar-image-add.component';

export enum CommonDialogType {
    ERROR,
    CONFIRM,
    INFO
}

export enum CommonDialogResult {
    OK,
    CANCEL,
    YES,
    NO
}

@Component({
    selector: 'jb-adm-jb-common-dialog',
    templateUrl: './jb-common-dialog.component.html',
    styleUrls: ['./jb-common-dialog.component.less']
})
export class JbCommonDialogComponent {

    @Input()
    commonDialogType: CommonDialogType = CommonDialogType.ERROR;

    @Input()
    message = 'Notify!';

    @Input()
    title = 'Alert!';

    commonDialogTypes = CommonDialogType;
    commonDialogResults = CommonDialogResult;

    constructor(
        // private activeModal: NgbActiveModal
    ) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class CommonDialogModal {

    show({commonDialogType, message, title}: { commonDialogType: CommonDialogType, message: string, title: string })
        : Promise<CommonDialogResult> {
        // const modalRef = this.modalService.open(JbCommonDialogComponent);
        // // inject options into AvatarImageAddComponent
        // modalRef.componentInstance.commonDialogType = commonDialogType;
        // modalRef.componentInstance.message = message;
        // modalRef.componentInstance.title = title;
        // return modalRef.result
        //     .then(null, err => {
        //         if ([ModalDismissReasons.BACKDROP_CLICK, ModalDismissReasons.ESC].indexOf(err) > -1) {
        //             return CommonDialogResult.CANCEL;
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

