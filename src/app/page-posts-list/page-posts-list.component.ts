import {AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, ParamMap, Router} from '@angular/router';
import {PostDetails} from '../resources/post/post-details';
import {PaginationResponse} from '../resources/pagination-response';
import {PostBrief} from '../resources/post/post-brief';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {PagePostsListResolverService} from './page-posts-list-resolver.service';
import {filter, switchMap} from 'rxjs/operators';
import {IsInViewDirective} from '../utils/is-in-view.directive';
import {ScrollDispatcher} from '@angular/cdk/scrolling';

export class PostBriefView extends PostBrief {
    constructor(postBrief: PostBrief, {checked = false}: { checked?: boolean } = {}) {
        super();
        Object.assign(this, postBrief);
        this.checked = checked;
    }

    checked: boolean;
}

@Component({
    selector: 'jb-adm-page-posts-list',
    templateUrl: './page-posts-list.component.html',
    styleUrls: ['./page-posts-list.component.less']
})
export class PagePostsListComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private scrollDispatcher: ScrollDispatcher,
        private resolver: PagePostsListResolverService,
    ) {
    }

    error: any = null;
    hasMore = false;
    loading = false;
    posts: Array<PostBriefView>;

    @ViewChild('loadMoreButtonIsInView')
    private _loadMoreButtonIsInViewRef: IsInViewDirective;
    private _scrollSubscription?: Subscription;
    private _queryParamsSubscription?: Subscription;
    private _routeDataSubscription?: Subscription;
    private _pagesLoading?: string;

    private _navToOneMorePageData() {
        const currentPages = parseInt(this.route.snapshot.queryParamMap.get('pages'), 10) || 1;
        this.router.navigate([], {
            queryParams: {
                pages: currentPages + 1
            },
            queryParamsHandling: 'merge',
        });
    }

    private _onScroll() {
        if (!this.loading && this._loadMoreButtonIsInViewRef.inView) {
            this.ngZone.run(() => {
                this.loading = true;
                this._navToOneMorePageData();
            });
        }
    }

    private _bindUpdatingPostsList() {
        // route run resolver when change matrix params, but not run resolver when change query params (See route definition)
        this._routeDataSubscription = this.route.data
            .subscribe(data => {
                const {resolvedPosts} = data as { resolvedPosts: PaginationResponse<PostBrief> };
                // Replace:
                this.posts = resolvedPosts.items.map(p => new PostBriefView(p));
                this.hasMore = resolvedPosts.hasMore;
                this.loading = false;
                this._pagesLoading = this.route.snapshot.queryParamMap.get('pages');
            });

        // process pagination, we observe query params without route resolver
        this._queryParamsSubscription = this.route.queryParamMap
            .pipe(
                filter(paramMap => this._pagesLoading !== paramMap.get('pages')),
                switchMap(paramMap => {
                    this.loading = true;
                    this._pagesLoading = paramMap.get('pages');
                    return this.resolver.fetchPageData(this.route.snapshot.paramMap, paramMap, {initialFetch: false});
                }),
            )
            .subscribe(res => {
                this.hasMore = res.hasMore;
                this.loading = false;
                this.posts = this.posts.concat(res.items.map(p => new PostBriefView(p)));
            }, err => {
                this.loading = false;
                this.error = err;
            });
    }


    ngOnInit() {
        this._bindUpdatingPostsList();
    }

    onLoadMoreButtonClick(e: MouseEvent) {
        if (!this.loading) {
            this._navToOneMorePageData();
        }
    }

    ngAfterViewInit(): void {
        this._scrollSubscription = this.scrollDispatcher.scrolled(200)
            .subscribe(this._onScroll.bind(this));
    }

    ngOnDestroy(): void {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
        }
        if (this._routeDataSubscription) {
            this._routeDataSubscription.unsubscribe();
        }
        if (this._queryParamsSubscription) {
            this._queryParamsSubscription.unsubscribe();
        }
    }
}
