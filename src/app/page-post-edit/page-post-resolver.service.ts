import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PostDetails} from '../resources/post/post-details';
import {Observable} from 'rxjs';
import {PostService} from '../resources/post/post.service';

@Injectable()
export class PagePostResolverService implements Resolve<PostDetails> {

    constructor(
        private postService: PostService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostDetails> {
        return this.postService.details(route.params.id);
    }
}
