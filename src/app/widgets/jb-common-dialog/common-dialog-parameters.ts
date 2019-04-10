import {ViewContainerRef} from '@angular/core';
import {CommonDialogComponentParameters} from './common-dialog-component-parameters';

export interface CommonDialogParameters extends CommonDialogComponentParameters{
    viewContainerRef?: ViewContainerRef;
}
