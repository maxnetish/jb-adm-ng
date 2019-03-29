import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';

interface HttpParamsDefinition {
    [param: string]: string | string[];
}

type TypesForHttpPrams = string | number | boolean | Date;

@Injectable({
    providedIn: 'root'
})
export class ResourcesUtilsService {

    constructor() {
    }

    private _includeInHttpParams(keepEmptyStrings: boolean) {
        return function (val: TypesForHttpPrams): boolean {
            if (val === '') {
                return keepEmptyStrings;
            }
            const t = typeof val;
            if (t === 'number') {
                return !isNaN(val as number);
            }
            if (t === 'boolean') {
                return true;
            }
            if (val instanceof Date) {
                return !!val;
            }
            return false;
        };
    }

    private _toStringInHttpParams(val: TypesForHttpPrams): string {
        switch (typeof val) {
            case 'string':
                return val as string;
            case 'number':
                return val.toString();
            case 'boolean':
                return val.toString();
        }
        if (val instanceof Date) {
            return (val as Date).toISOString();
        }
        return (val as object).toString();
    }

    /**
     * string | number | boolean | Date | Array<string | number | boolean | Date>
     *  Params should be "string | number | boolean | Date | Array<string | number | boolean | Date>"
     */
    clearHttpParams(
        params: { [key: string]: any },
        {keepEmptyStrings = false}: { keepEmptyStrings?: boolean } = {}
    ): HttpParamsDefinition {

        const result: HttpParamsDefinition = {};

        for (const key in params) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }
            const val = params[key];

            if (Array.isArray(val)) {
                result[key] = (val as Array<string | number | boolean | Date>)
                    .filter(this._includeInHttpParams(keepEmptyStrings))
                    .map(this._toStringInHttpParams);
                continue;
            }

            if (this._includeInHttpParams(keepEmptyStrings)(val)) {
                result[key] = this._toStringInHttpParams(val);
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
