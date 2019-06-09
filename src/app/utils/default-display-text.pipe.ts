import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';

@Pipe({
    name: 'defaultDisplayText'
})
export class DefaultDisplayTextPipe implements PipeTransform {

    transform(value: any, ifEmpty?: any): any {
        const t = typeof value;
        switch (t) {
            case 'number':
                return isNaN(value) ? ifEmpty : value;
            case 'boolean':
                return value;
            default:
                return value || ifEmpty;
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DefaultDisplayTextPipe,
    ],
    exports: [
        DefaultDisplayTextPipe,
    ]
})
export class DefaultDisplayTextModule {}
