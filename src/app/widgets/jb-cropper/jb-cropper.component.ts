import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import * as Croppie from 'croppie';
import {CropData, CroppieOptions} from 'croppie';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {bind} from '@angular/core/src/render3';

@Component({
    selector: 'jb-adm-jb-cropper',
    templateUrl: './jb-cropper.component.html',
    styleUrls: ['./jb-cropper.component.less'],
    // these required to register component as ValueAccessor
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JbCropperComponent),
            multi: true
        }
    ]
})
export class JbCropperComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

    @Input()
    croppieOptions: CroppieOptions;

    @Output()
    changed = new EventEmitter<{ cropData: CropData, fileName: string }>();

    private choosedFile: File;

    @ViewChild('croppieContainer')
    private croppieContainerRef: ElementRef;

    croppie: Croppie;
    private readonly croppieOptionsDefault: CroppieOptions = {
        boundary: {width: 200, height: 200},
        customClass: '',
        viewport: {width: 100, height: 100, type: 'square'},
        enforceBoundary: false
    };
    private readonly croppieOptionsForce: CroppieOptions = {
        enableExif: false,
        enableOrientation: false,
        // not in type
        // enableResize: false
        enableZoom: true,
        mouseWheelZoom: true,
        showZoomer: true
    };
    private disabledChooseButton = false;

    private m_croppieListeners: { event: string, listener: EventListener }[] = [
        {
            event: 'update',
            listener: this.m_onCroppieUpdate.bind(this)
        }
    ];

    private m_onAccessorChange: (value: any) => void;
    private m_onAccessorTouched: (value?: any) => void;

    private m_onCroppieUpdate(event: Event & { detail: CropData }) {
        const sendData = {
            cropData: event.detail,
            fileName: this.choosedFile.name
        };
        if (this.m_onAccessorTouched) {
            this.m_onAccessorTouched();
        }
        if (this.m_onAccessorChange) {
            this.m_onAccessorChange(sendData);
        }
        if (this.changed) {
            this.changed.emit(sendData);
        }
    }

    private m_initCroppie() {
        const actualCroppieOptions: CroppieOptions = {};
        const croppieNativeElement = this.croppieContainerRef.nativeElement as HTMLElement;
        Object.assign<CroppieOptions, CroppieOptions, CroppieOptions, CroppieOptions>
        (
            actualCroppieOptions,
            this.croppieOptionsDefault,
            this.croppieOptions,
            this.croppieOptionsForce
        );
        this.croppie = new Croppie(croppieNativeElement, actualCroppieOptions);
        this.m_croppieListeners.forEach(eventInfo => {
            croppieNativeElement.addEventListener(eventInfo.event, eventInfo.listener);
        });
    }


    private onFileInputChange(e: UIEvent) {
        const target = e.target as HTMLInputElement;

        if (target.files && target.files.length) {
            this.choosedFile = target.files[0];
            const reader = new FileReader();
            reader.onload = loadEvent => {
                const loadedReader = loadEvent.target as FileReader;
                this.croppie.bind({url: loadedReader.result as string});
            };
            reader.readAsDataURL(this.choosedFile);
        }
    }

    constructor() {
    }

    ngAfterViewInit(): void {
        this.m_initCroppie();
    }

    ngOnDestroy(): void {
        if (this.croppie) {
            const croppieNativeElement = this.croppieContainerRef.nativeElement as HTMLElement;
            this.m_croppieListeners.forEach(eventInfo => {
                croppieNativeElement.removeEventListener(eventInfo.event, eventInfo.listener);
            });
            this.croppie.destroy();
        }
    }

    registerOnChange(fn: any): void {
        this.m_onAccessorChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.m_onAccessorTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabledChooseButton = isDisabled;
    }

    writeValue(obj: any): void {
        // Do nothing: component didn't intend initial value
    }

}
