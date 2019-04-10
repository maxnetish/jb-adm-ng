import {CommonDialogType} from './common-dialog-type.enum';

export interface CommonDialogComponentParameters {
    commonDialogType?: CommonDialogType;
    message?: string;
    title?: string;
}
