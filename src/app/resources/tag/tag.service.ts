import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourcesUtilsService } from '../resources-utils.service';
import { JbTagSearchCriteria } from './jb-tag-search-criteria';
import { JbTagSearchResponse } from './jb-tag-search-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    list(request: JbTagSearchCriteria): Observable<JbTagSearchResponse> {
        return this.http.get<JbTagSearchResponse>(this.resourcesUtils.prependHostTo('/api/tag/list'), {
            params: this.resourcesUtils.clearHttpParams(request),
            observe: 'response',
            reportProgress: false,
            responseType: 'json',
            withCredentials: true
        })
            .pipe(
                map(res => res.body)
            );
    }

    constructor(
        private http: HttpClient,
        private resourcesUtils: ResourcesUtilsService
    ) { }
}
