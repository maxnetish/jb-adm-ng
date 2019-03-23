import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';

interface HttpParamsDefinition {
    [param: string]: string | string[];
}

@Injectable({
    providedIn: 'root'
})
export class ResourcesUtilsService {

    constructor() {
    }

    clearHttpParams(
        params: HttpParamsDefinition,
        {keepEmptyStrings = false}: { keepEmptyStrings?: boolean } = {}
    ): HttpParamsDefinition {

        const result: HttpParamsDefinition = {};

        for (const key in params) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }
            const val = params[key];

            if (Array.isArray(val)) {
                result[key] = (val as string[]).filter(elm => {
                    if (elm === '') {
                        return keepEmptyStrings;
                    }
                    return !!elm;
                });
                continue;
            }

            if (val === '' && keepEmptyStrings) {
                result[key] = val;
                continue;
            }

            if (!!val) {
                result[key] = val;
            }
        }

        return result;
    }

    prependHostTo(url: string) {
        if (env && env.backendHostUrl) {
            return `${env.backendHostUrl}${url}`;
        }
        return url;
    }
}
