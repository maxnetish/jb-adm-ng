import {Component, Injectable, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CropData, CroppieOptions} from 'croppie';
import * as Croppie from 'croppie';
import {AbstractControl, FormBuilder, ValidatorFn} from '@angular/forms';


@Component({
    selector: 'jb-adm-avatar-image-add',
    templateUrl: './avatar-image-add.component.html',
    styleUrls: ['./avatar-image-add.component.less']
})
export class AvatarImageAddComponent {

    @Input() croppieOptions: CroppieOptions;

    private readonly AvatarEditForm = this.fb.group({
        cropper: [{cropData: null, fileName: null}, [this.cropperValidator()]],
        description: [null]
    });

    private cropperValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const choosedFileName = control.value && control.value.fileName;
            return choosedFileName ? null : {'fileRequired': {value: control.value}};
        };
    }

    onCroppieChanged(croppieData: CropData, croppieInstance: Croppie) {
        console.info(croppieData, croppieInstance);
    }

    constructor(
        private activeModal: NgbActiveModal,
        private fb: FormBuilder
    ) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class AvatarImageAddModal {
    show({croppieOptions = null}: { croppieOptions?: CroppieOptions } = {}) {
        const modalRef = this.modalService.open(AvatarImageAddComponent);
        modalRef.componentInstance.croppieOptions = croppieOptions;
        return modalRef;
    }

    constructor(private modalService: NgbModal) {
    }
}
