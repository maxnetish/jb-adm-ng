import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'jb-adm-tags-form-control',
    templateUrl: './tags-form-control.component.html',
    styleUrls: ['./tags-form-control.component.less'],
    // these required to register component as ValueAccessor
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TagsFormControlComponent),
            multi: true
        }
    ],
    // try more light OnPush strategy
    // changes will detects if @Input changed
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsFormControlComponent implements OnInit, ControlValueAccessor {

    tags: Array<string> = [];
    tagsFormControl: FormControl = new FormControl([]);

    constructor() {
    }

    ngOnInit() {
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }

}
