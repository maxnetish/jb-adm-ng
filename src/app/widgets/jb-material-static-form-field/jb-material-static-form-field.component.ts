import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {NgControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {__values} from 'tslib';

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

    private _value: any;

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
    @Input() required: boolean;
    readonly shouldLabelFloat: boolean = true;
    readonly stateChanges = new Subject<void>();
    @Input()
    get value(): any | null {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.stateChanges.next();
    }

    onContainerClick(event: MouseEvent): void {
    }

    setDescribedByIds(ids: string[]): void {
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }


}
