import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../resources/post/post.service';
import {PostFindCriteria} from '../../resources/post/post-find-criteria';
import {PaginationResponse} from '../../resources/pagination-response';
import {PostBrief} from '../../resources/post/post-brief';
import {switchMap} from 'rxjs/operators';
import {PostStatus} from '../../resources/post/post-status.enum';

@Component({
    selector: 'jb-adm-posts-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

    constructor(private route: ActivatedRoute, private postServiceInstance: PostService) {
    }

    posts: [PostBrief?] = [];

    ngOnInit() {
        const {paramMap} = this.route;
        paramMap.pipe(switchMap(paramsAsMap => {
            const criteria: PostFindCriteria = {
                q: paramsAsMap.get('q'),
                from: paramsAsMap.get('from'),
                to: paramsAsMap.get('to'),
                statuses: [PostStatus.PUB, PostStatus.DRAFT],
                page: 1
            };
            return this.postServiceInstance.list(criteria);
        }))
            .subscribe((paginationResponse: PaginationResponse<PostBrief>) => {
                this.posts = paginationResponse.items;
                console.log(paginationResponse);
            }, err => {
                console.warn(err);
            });
    }

}
