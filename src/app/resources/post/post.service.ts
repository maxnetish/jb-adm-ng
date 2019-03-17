import {Injectable} from '@angular/core';
import {PostFindCriteria} from './post-find-criteria';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PostBrief} from './post-brief';
import {PaginationResponse} from '../pagination-response';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    list(criteria: PostFindCriteria): Observable<PaginationResponse<PostBrief>> {
        const baseUrl = '/api/post/list';
        let params = new HttpParams();
        const actualUrl = environment.backendHostUrl ? environment.backendHostUrl + baseUrl : baseUrl;

        for (const key in criteria) {
            if (!criteria.hasOwnProperty(key)) {
                continue;
            }
            const val = criteria[key];
            if (val === null || val === undefined || val === '') {
                continue;
            }
            params = params.set(key, val);
        }

        return this.http.get<PaginationResponse<PostBrief>>(actualUrl, {
            params,
            observe: 'response',
            reportProgress: false,
            responseType: 'json',
            withCredentials: true
        })
            .pipe(map(res => res.body));
    }
}
