import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, ParamMap, Resolve, RouterStateSnapshot} from '@angular/router';
import {PaginationResponse} from '../resources/pagination-response';
import {PostBrief} from '../resources/post/post-brief';
import {PostFindCriteria} from '../resources/post/post-find-criteria';
import {PostStatus} from '../resources/post/post-status.enum';
import {Observable} from 'rxjs';
import {PostService} from '../resources/post/post.service';

export interface IPagePostsListResolverOptions {
    initialFetch?: boolean;
}

@Injectable()
export class PagePostsListResolverService implements Resolve<PaginationResponse<PostBrief>> {

    constructor(
        private postService: PostService
    ) {
    }

    static routeParamsToCriteria(matrixParams: ParamMap, queryParams: ParamMap, {initialFetch = false}: IPagePostsListResolverOptions = {}): PostFindCriteria {
        return {
            q: matrixParams.get('q'),
            from: matrixParams.get('from'),
            to: matrixParams.get('to'),
            statuses: [PostStatus.PUB, PostStatus.DRAFT],
            page: initialFetch ? undefined : parseInt(queryParams.get('pages'), 10) || 1,
            pages: initialFetch ? parseInt(queryParams.get('pages'), 10) || 1 : undefined,
        };
    }

    fetchPageData(matrixParams: ParamMap, queryParams: ParamMap, opts?: IPagePostsListResolverOptions) {
        const criteria = PagePostsListResolverService.routeParamsToCriteria(matrixParams, queryParams, opts);
        return this.postService.list(criteria);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResponse<PostBrief>> {
        return this.fetchPageData(route.paramMap, route.queryParamMap, {initialFetch: true});
    }
}
