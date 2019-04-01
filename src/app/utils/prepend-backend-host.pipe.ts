import {Pipe, PipeTransform} from '@angular/core';
import {environment as env} from '../../environments/environment';

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
