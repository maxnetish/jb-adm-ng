import {Directive, ElementRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
    selector: 'input[type=file][jbAdmFileInput]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: JbFileInputDirective,
            multi: true
        }
    ]
})
export class JbFileInputDirective implements ControlValueAccessor {

    private _registeredOnChange: (val?: any) => void;
    private _registsredOnTouched: (val?: any) => void;

    @HostListener('change', ['$event.target.files'])
    _inputChangeHandler(files: FileList) {
        if (this._registsredOnTouched) {
            this._registsredOnTouched();
        }
        if (this._registeredOnChange) {
            this._registeredOnChange(files);
        }
    }

    constructor(
        private elm: ElementRef
    ) {
    }

    registerOnChange(fn: any): void {
        this._registeredOnChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._registsredOnTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.elm.nativeElement.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        this.elm.nativeElement.files = obj;
    }

}
