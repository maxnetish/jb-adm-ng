import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../resources/post/post.service';
import {PostFindCriteria} from '../../resources/post/post-find-criteria';
import {PaginationResponse} from '../../resources/pagination-response';
import {PostBrief} from '../../resources/post/post-brief';
import {switchMap} from 'rxjs/operators';
import {PostStatus} from '../../resources/post/post-status.enum';
import {environment as env} from '../../../environments/environment';
import {MatCheckboxChange} from '@angular/material';

class PostBriefView extends PostBrief {
    constructor(postBrief: PostBrief, {checked = false}: { checked?: boolean } = {}) {
        super();
        Object.assign(this, postBrief);
        this.checked = checked;
    }

    checked: boolean;
}

interface PostAction {
    label: string;
    href?: (post: PostBriefView) => string;
    action?: (post: PostBriefView) => void;
    allow: (post: PostBriefView) => boolean;
    iconClass?: string;
}

@Component({
    selector: 'jb-adm-posts-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

    masterCheckboxChecked = false;
    masterCheckboxIndeterminate = false;

    posts: PostBriefView[] = [];

    actions: PostAction[] = [
        {
            label: 'Preview',
            href: p => `${env.pubHostUrl}/post/${p._id}`,
            allow: p => true,
            iconClass: 'far fa-file-alt'
        },
        {
            label: 'Make draft',
            action: p => null,
            allow: p => p.status === PostStatus.PUB,
            iconClass: 'far fa-eye-slash'
        },
        {
            label: 'Publish',
            action: p => null,
            allow: p => p.status === PostStatus.DRAFT,
            iconClass: 'far fa-eye'
        },
        {
            label: 'Import to file',
            action: p => null,
            allow: p => true,
            iconClass: 'far fa-arrow-alt-circle-down'
        },
        {
            label: 'Remove',
            action: p => null,
            allow: p => true,
            iconClass: 'far fa-trash-alt'
        }
    ];

    onMasterCheckboxChange(e: MatCheckboxChange) {
        const checked = e.checked;
        this.masterCheckboxChecked = checked;
        this.masterCheckboxIndeterminate = false;
        this.posts.forEach(p => p.checked = checked);
    }

    onRowCheckboxChange(e: MatCheckboxChange, targetPost: PostBriefView) {
        targetPost.checked = e.checked;

        const allChecked = this.posts.every(post => post.checked);
        const allUnchecked = this.posts.every(post => !post.checked);

        if (allChecked) {
            this.masterCheckboxChecked = true;
            this.masterCheckboxIndeterminate = false;
        } else if (allUnchecked) {
            this.masterCheckboxChecked = false;
            this.masterCheckboxIndeterminate = false;
        } else {
            this.masterCheckboxChecked = false;
            this.masterCheckboxIndeterminate = true;
        }
    }

    constructor(
        private route: ActivatedRoute,
        private postServiceInstance: PostService
    ) {
    }

    ngOnInit() {
        const {queryParamMap} = this.route;
        queryParamMap.pipe(switchMap(paramsAsMap => {
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
                this.posts = paginationResponse.items.map(postBrief => new PostBriefView(postBrief, {checked: false}));
            }, err => {
                console.warn(err);
            });
    }

}
