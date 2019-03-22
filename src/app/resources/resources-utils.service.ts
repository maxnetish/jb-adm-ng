import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ResourcesUtilsService {

    constructor() {
    }

    prependHostTo(url: string) {
        if (env && env.backendHostUrl) {
            return `${env.backendHostUrl}${url}`;
        }
        return url;
    }
}
