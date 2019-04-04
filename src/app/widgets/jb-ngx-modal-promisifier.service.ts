import {Injectable, TemplateRef} from '@angular/core';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap';

type NgxShowModal = (content: string | TemplateRef<any> | any, config?: ModalOptions) => BsModalRef;

@Injectable({
    providedIn: 'root'
})
export class JbNgxModalPromisifierService {

    promisify<T>(fn: NgxShowModal) {
        return function (content: string | TemplateRef<any> | any, config?: ModalOptions): Promise<T> {
            const modalRef = fn(content, config);

            let resolver: (val: T) => void;
            let rejector: (reason: any) => void;

            const promise = new Promise<T>((resolve, reject) => {
                resolver = (result: T) => resolve(result);
                rejector = (reason: any) => reject(reason);
            });

            modalRef.content.close = (result: T) => {
                modalRef.hide();
                resolver(result);
            };
            modalRef.content.dismiss = (reason: any) => {
                modalRef.hide();
                rejector(reason);
            };



            return promise;
        };
    }

    constructor() {
    }
}
