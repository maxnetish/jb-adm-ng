import {Injectable, TemplateRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {JbTemplateInjectorParams} from './jb-template-injector-params';

@Injectable({
    providedIn: 'root'
})
export class JbTemplateInjectorService {

    private _injects: Subject<JbTemplateInjectorParams> = new Subject();
    get injects(): Observable<JbTemplateInjectorParams> {
        return this._injects.asObservable();
    }

    emitTemplate(template?: TemplateRef<any>, target?: string) {
        this._injects.next({
            target,
            template
        });
    }

    constructor() {

    }
}
