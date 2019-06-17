import {ActivatedRouteSnapshot, ParamMap, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

export interface PostsListFormSearchParams {
    q: string;
    from: Date;
    to: Date;
}

@Injectable()
export class PagePostsListSearchFormResolverService implements Resolve<Partial<PostsListFormSearchParams>> {
    resolve(routeSnapshotOrRouteParams: ActivatedRouteSnapshot | ParamMap): Partial<PostsListFormSearchParams> {
        const routeParams = routeSnapshotOrRouteParams instanceof ActivatedRouteSnapshot ?
            routeSnapshotOrRouteParams.paramMap :
            routeSnapshotOrRouteParams;
        return {
            q: routeParams.has('q') ? routeParams.get('q') : null,
            from: routeParams.has('from') ? new Date(routeParams.get('from')) : null,
            to: routeParams.has('to') ? new Date(routeParams.get('to')) : null
        };
    }
}
