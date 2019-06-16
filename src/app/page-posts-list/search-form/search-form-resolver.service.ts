import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

export interface PostsListFormSearchParams {
    q: string;
    from: Date;
    to: Date;
}

@Injectable()
export class PagePostsListSearchFormResolverService implements Resolve<Partial<PostsListFormSearchParams>> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Partial<PostsListFormSearchParams> {
        const matrixParams = route.paramMap;
        return {
            q: matrixParams.has('q') ? matrixParams.get('q') : null,
            from: matrixParams.has('from') ? new Date(matrixParams.get('from')) : null,
            to: matrixParams.has('to') ? new Date(matrixParams.get('to')) : null
        };
    }
}
