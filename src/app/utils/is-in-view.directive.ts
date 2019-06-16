import {Directive, ElementRef, EventEmitter, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[jbAdmIsInView]',
    exportAs: 'jbAdmIsInView'
})
export class IsInViewDirective {

    constructor(
        private hostRef: ElementRef,
    ) {
    }

    @Output('jbAdmIsInViewChange')
    scrolledIn = new EventEmitter<boolean>();

    static getViewportWidth(): number {
        return window.innerWidth || window.document.documentElement.clientWidth;
    }

    static getViewportHeight(): number {
        return window.innerHeight || window.document.documentElement.clientHeight;
    }

    public get inView(): boolean {
        return this._isInView();
    }

    private _isInView(): boolean {
        if (!this.hostRef.nativeElement) {
            return false;
        }
        const bounds = (this.hostRef.nativeElement as HTMLElement).getBoundingClientRect();
        return bounds.top >= 0 &&
            bounds.left >= 0 &&
            bounds.bottom <= IsInViewDirective.getViewportHeight() &&
            bounds.right <= IsInViewDirective.getViewportWidth();
    }
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        IsInViewDirective,
    ],
    exports: [
        IsInViewDirective,
    ]
})
export class IsInViewModule {
}
