import {Injectable} from '@angular/core';
import {PostFindCriteria} from './post-find-criteria';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PostBrief} from './post-brief';
import {PaginationResponse} from '../pagination-response';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PostDetails} from './post-details';
import {ResourcesUtilsService} from '../resources-utils.service';
import {PostUpdate} from './post-update';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private http: HttpClient,
        private resourcesUtils: ResourcesUtilsService
    ) {
    }

    list(criteria: PostFindCriteria): Observable<PaginationResponse<PostBrief>> {
        return this.http.get<PaginationResponse<PostBrief>>(this.resourcesUtils.prependHostTo('/api/post/list'), {
                params: this.resourcesUtils.clearHttpParams(criteria),
                observe: 'response',
                reportProgress: false,
                responseType: 'json',
                withCredentials: true
            })
            .pipe(
                map(res => res.body)
            );
    }

    details(id: string): Observable<PostDetails> {
        return this.http.get<PostDetails>(this.resourcesUtils.prependHostTo('/api/post/get'), {
                params: this.resourcesUtils.clearHttpParams({id}),
                observe: 'response',
                reportProgress: false,
                responseType: 'json',
                withCredentials: true
            })
            .pipe(
                map(res => res.body)
            );
    }

    createOrUpdate(request: PostUpdate): Observable<PostDetails> {
        return this.http.post<PostDetails>(this.resourcesUtils.prependHostTo('/api/post/createOrUpdate'), request, {
                observe: 'response',
                reportProgress: false,
                responseType: 'json',
                withCredentials: true
            })
            .pipe(
                map(res => res.body)
            );
    }
}
