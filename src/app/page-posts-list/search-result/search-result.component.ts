import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../resources/post/post.service';
import {PostFindCriteria} from '../../resources/post/post-find-criteria';
import {PaginationResponse} from '../../resources/pagination-response';
import {PostBrief} from '../../resources/post/post-brief';
import {switchMap} from 'rxjs/operators';
import {PostStatus} from '../../resources/post/post-status.enum';
import {environment as env} from '../../../environments/environment';
import {MatCheckboxChange, MatSnackBar} from '@angular/material';
// import {autobind} from 'core-decorators';
import {MongoUpdateResponse} from '../../resources/mongo-update-response';
// import * as coreDecorators from 'core-decorators';

// import {Observable} from 'rxjs';

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
    href?: (post: PostBriefView | PostBriefView[]) => string;
    action?: (post: PostBriefView | PostBriefView[]) => void;
    allowForSinglePost: (post: PostBriefView) => boolean;
    allowForManyPosts: (posts: PostBriefView[]) => boolean;
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
    hasMore = false;
    loading = false;
    pagesLoaded = 0;

    posts: PostBriefView[] = [];

    actions: PostAction[] = [
        {
            label: 'Preview in new window',
            href: SearchResultComponent._postToPreviewUrl,
            allowForSinglePost: p => true,
            allowForManyPosts: pp => pp.length === 1,
            iconClass: 'far fa-file-alt'
        },
        {
            label: 'Make draft',
            action: this._makeDraft.bind(this),
            // action: this._makeDraft,
            allowForSinglePost: p => p.status === PostStatus.PUB,
            allowForManyPosts: pp => pp.some(p => p.status === PostStatus.PUB),
            iconClass: 'far fa-eye-slash'
        },
        {
            label: 'Publish',
            action: this._makePublish.bind(this),
            // action: this._makePublish,
            allowForSinglePost: p => p.status === PostStatus.DRAFT,
            allowForManyPosts: pp => pp.some(p => p.status === PostStatus.DRAFT),
            iconClass: 'far fa-eye'
        },
        {
            label: 'Import to file',
            action: p => null,
            allowForSinglePost: p => true,
            allowForManyPosts: pp => !!pp.length,
            iconClass: 'far fa-arrow-alt-circle-down'
        },
        {
            label: 'Remove',
            action: p => null,
            allowForSinglePost: p => true,
            allowForManyPosts: pp => !!pp.length,
            iconClass: 'far fa-trash-alt'
        }
    ];

    private static _postToPreviewUrl(p: PostBriefView | PostBriefView[]) {
        const id = Array.isArray(p) ? p[0]._id : p._id;
        return `${env.pubHostUrl}/post/${id}`;
    }

    private _mongoResponseToMessage(response: MongoUpdateResponse) {
        this.snackBar.open(
            `Jah bless! ${response.nModified} ${response.nModified > 1 ? 'items' : 'item'} successfully updated.`,
            null,
            {duration: 3000}
        );
    }

    private _errToMessage(err: any) {
        console.warn(err);
        this.snackBar.open('Something went wrong. See console.', null, {duration: 10000});
    }

    private _updateSpecificPosts(postOrPosts: PostBriefView | PostBriefView[]) {
        const request: PostFindCriteria = {
            ids: Array.isArray(postOrPosts) ? postOrPosts.map(p => p._id) : [postOrPosts._id],
            statuses: [PostStatus.PUB, PostStatus.DRAFT]
        };
        this.postServiceInstance.list(request)
            .subscribe(response => {
                response.items.forEach(postBrief => {
                    const existentPostBriefView = this.posts.find(p => p._id === postBrief._id);
                    if (existentPostBriefView) {
                        Object.assign(existentPostBriefView, postBrief);
                    }
                });
            }, err => {
                console.warn(err);
            });
    }

    // @autobind
    private _makePublish(postOrPosts: PostBriefView | PostBriefView[]) {
        const request = {
            ids: Array.isArray(postOrPosts) ? postOrPosts.map(p => p._id) : [postOrPosts._id]
        };
        return this.postServiceInstance.publish(request)
            .subscribe(response => {
                this._mongoResponseToMessage(response);
                this._updateSpecificPosts(postOrPosts);
            }, this._errToMessage);
    }

    // @autobind
    private _makeDraft(postOrPosts: PostBriefView | PostBriefView[]) {
        const request = {
            ids: Array.isArray(postOrPosts) ? postOrPosts.map(p => p._id) : [postOrPosts._id]
        };
        return this.postServiceInstance.unpublish(request)
            .subscribe(response => {
                this._mongoResponseToMessage(response);
                this._updateSpecificPosts(postOrPosts);
            }, this._errToMessage);
    }

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

    onPostActionButtonClick(e: MouseEvent, action: PostAction, target: PostBriefView | PostBriefView[]) {
        if (action.href) {
            window.open(action.href(target));
        }
        if (action.action) {
            action.action(target);
        }
    }

    get someSelected() {
        if (!this.posts.length) {
            return false;
        }

        return this.posts.some(p => p.checked);
    }

    get selected() {
        return this.posts.filter(p => p.checked);
    }

    onLoadMoreButtonClick(e: UIEvent) {
        this.router.navigate(['/posts'], {
            queryParams: {
                page: this.pagesLoaded + 1
            },
            queryParamsHandling: 'merge'
        });
    }

    constructor(
        private route: ActivatedRoute,
        private postServiceInstance: PostService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        const {queryParamMap} = this.route;
        queryParamMap
            .pipe(
                switchMap(paramsAsMap => {
                    this.loading = true;
                    const criteria: PostFindCriteria = {
                        q: paramsAsMap.get('q'),
                        from: paramsAsMap.get('from'),
                        to: paramsAsMap.get('to'),
                        statuses: [PostStatus.PUB, PostStatus.DRAFT],
                        page: parseInt(paramsAsMap.get('page'), 10) || 1,
                    };
                    return this.postServiceInstance.list(criteria);
                }),
            )
            .subscribe((paginationResponse: PaginationResponse<PostBrief>) => {
                const paramsMap = this.route.snapshot.queryParamMap;
                const actualPage = parseInt(paramsMap.get('page'), 10) || 1;

                if (actualPage === 1) {
                    // first page: replace content of whole table and clear selection status
                    this.posts = paginationResponse.items.map(postBrief => new PostBriefView(postBrief, {checked: false}));
                    this.masterCheckboxChecked = false;
                    this.masterCheckboxIndeterminate = false;
                } else {
                    // not first page: add new data to table
                    this.posts = this.posts.concat(
                        paginationResponse.items.map(postBrief => new PostBriefView(postBrief, {checked: false}))
                    );
                }

                this.hasMore = paginationResponse.hasMore;
                this.loading = false;
                this.pagesLoaded = actualPage;
            }, err => {
                console.warn(err);
                this.loading = false;
            });
    }

}
