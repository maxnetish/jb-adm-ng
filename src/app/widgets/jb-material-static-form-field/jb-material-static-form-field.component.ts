import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {NgControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'jb-adm-material-static-form-field',
    templateUrl: './jb-material-static-form-field.component.html',
    styleUrls: ['./jb-material-static-form-field.component.less'],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: JbMaterialStaticFormFieldComponent,
        }
    ]
})
export class JbMaterialStaticFormFieldComponent implements MatFormFieldControl<any>, OnDestroy {

    static nextId = 0;

    constructor() {
    }

    readonly autofilled: boolean = false;
    readonly controlType: string = 'jb-field-static';

    @Input()
    disabled = true;

    get empty() {
        return !!this.value;
    }

    readonly errorState: boolean = false;
    readonly focused: boolean = false;
    @HostBinding() readonly id: string = `jb-field-static-${JbMaterialStaticFormFieldComponent.nextId++}`;
    readonly ngControl: NgControl | null = null;
    readonly placeholder: string;
    readonly required: boolean;
    readonly shouldLabelFloat: boolean = true;
    readonly stateChanges = new Subject<void>();
    value: any | null;

    onContainerClick(event: MouseEvent): void {
    }

    setDescribedByIds(ids: string[]): void {
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }


}
