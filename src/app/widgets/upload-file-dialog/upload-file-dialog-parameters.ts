import {UploadFileComponentParameters} from './upload-file-component-parameters';
import {ViewContainerRef} from '@angular/core';

export interface UploadFileDialogParameters extends UploadFileComponentParameters {
    viewContainerRef?: ViewContainerRef;
}
