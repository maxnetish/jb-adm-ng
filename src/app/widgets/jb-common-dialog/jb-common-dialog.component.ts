import {Component, Inject, Injectable, Input} from '@angular/core';
// import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CommonDialogType} from './common-dialog-type.enum';
import {CommonDialogResult} from './common-dialog-result.enum';
import {CommonDialogParameters} from './common-dialog-parameters';
import {CommonDialogComponentParameters} from './common-dialog-component-parameters';

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
        private modalRef: MatDialogRef<JbCommonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private passedData: CommonDialogComponentParameters,
    ) {
        this.commonDialogType = this.passedData.commonDialogType;
        this.message = this.passedData.message;
        this.title = this.passedData.title;
    }
}

@Injectable({
    providedIn: 'root'
})
export class CommonDialogModal {

    show(
        {
            commonDialogType = CommonDialogType.ERROR,
            message = 'Unknown error',
            title = 'Message',
            viewContainerRef = null
        }: CommonDialogParameters = {})
        : Promise<CommonDialogResult> {
        const modalConfig: MatDialogConfig<CommonDialogComponentParameters> = {
            viewContainerRef,
            data: {
                commonDialogType,
                message,
                title
            }
        };
        const modalRef = this.matDialog.open<JbCommonDialogComponent, CommonDialogComponentParameters, CommonDialogResult>(
            JbCommonDialogComponent,
            modalConfig
        );
        return modalRef.afterClosed().toPromise()
            // return CommonDialogResult.CANCEL on default
            // and supress any rejects from dialog
            .then(res => res || CommonDialogResult.CANCEL)
            .then(null, err => CommonDialogResult.CANCEL);
    }

    constructor(
        private matDialog: MatDialog
    ) {
    }
}

