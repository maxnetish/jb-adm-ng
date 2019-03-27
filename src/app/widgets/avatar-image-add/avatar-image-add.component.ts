import {Component, Injectable, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jb-adm-avatar-image-add',
    templateUrl: './avatar-image-add.component.html',
    styleUrls: ['./avatar-image-add.component.less']
})
export class AvatarImageAddComponent {

    @Input() data: any;

    constructor(private activeModal: NgbActiveModal) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class AvatarImageAddModal {
    show(data?: any) {
        const modalRef = this.modalService.open(AvatarImageAddComponent);
        modalRef.componentInstance.data = data;
        return modalRef;
    }

    constructor(private modalService: NgbModal) {
    }
}
