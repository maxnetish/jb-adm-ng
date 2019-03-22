import {Injectable} from '@angular/core';
import {PostFindCriteria} from './post-find-criteria';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PostBrief} from './post-brief';
import {PaginationResponse} from '../pagination-response';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PostDetails} from './post-details';
import {ResourcesUtilsService} from '../resources-utils.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private resourcesUtils: ResourcesUtilsService
    ) {
    }

    private;

    list(criteria: PostFindCriteria): Observable<PaginationResponse<PostBrief>> {
        return this.http.get<PaginationResponse<PostBrief>>(this.resourcesUtils.prependHostTo('/api/post/list'), {
            // TODO handle of undefined and null params, we won't pass them
            params: {
                from: criteria.from || undefined,
                to: criteria.to || undefined,
                q: criteria.q || undefined,
                page: criteria.page.toString(),
                statuses: criteria.statuses
            },
            observe: 'response',
            reportProgress: false,
            responseType: 'json',
            withCredentials: true
        })
            .pipe(map(res => res.body));
    }

    details(id: string): Observable<PostDetails> {
        return this.http.get<PostDetails>(this.resourcesUtils.prependHostTo('/api/post/get'), {
            params: {id},
            observe: 'response',
            reportProgress: false,
            responseType: 'json',
            withCredentials: true
        })
            .pipe(map(res => res.body));
    }
}
