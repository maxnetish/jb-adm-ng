import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {CommonModule} from '@angular/common';

@Pipe({
    name: 'prependBackendHost'
})
export class PrependBackendHostPipe implements PipeTransform {

    transform(value: string): string {
        if (env && env.backendHostUrl) {
            return `${env.backendHostUrl}${value}`;
        }
        return value;
    }

}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PrependBackendHostPipe,
    ],
    exports: [
        PrependBackendHostPipe,
    ]
})
export class PrependBackendHostModule {
}
