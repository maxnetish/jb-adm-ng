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
import {PagePostsListSearchFormResolverService, PostsListFormSearchParams} from './search-form/search-form-resolver.service';

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
        private searchParamsResolver: PagePostsListSearchFormResolverService,
    ) {
    }

    error: any = null;
    hasMore = false;
    loading = false;
    posts: Array<PostBriefView> = [];

    @ViewChild('loadMoreButtonIsInView')
    private _loadMoreButtonIsInViewRef: IsInViewDirective;
    private _scrollSubscription?: Subscription;
    private _routeParamsSubscription?: Subscription;
    private _appliedParams: Partial<PostsListFormSearchParams> = {};

    private _appliedParamsHasChanges(
        newParams: Partial<PostsListFormSearchParams>,
        oldParams?: Partial<PostsListFormSearchParams>
    ): boolean {
        if (!oldParams) {
            return true;
        }
        return ['q', 'from', 'to'].some(key => newParams[key] !== oldParams[key]);
    }

    private _navToOneMorePageData() {
        const currentPages = parseInt(this.route.snapshot.queryParamMap.get('pages'), 10) || 1;
        this.router.navigate([{pages: currentPages + 1}], {
            queryParamsHandling: 'merge',
        });
    }

    private _onScroll() {
        if (!this.loading && this.hasMore && this._loadMoreButtonIsInViewRef.inView) {
            this.ngZone.run(() => {
                this.loading = true;
                this._navToOneMorePageData();
            });
        }
    }

    private _bindUpdatingPostsList() {
        // process pagination, we observe query params without route resolver
        this._routeParamsSubscription = this.route.paramMap
            .pipe(
                switchMap(paramMap => {
                    const initialFetch = this._appliedParamsHasChanges(this.searchParamsResolver.resolve(paramMap), this._appliedParams);
                    this.loading = true;
                    return this.resolver.fetchPageData(paramMap, {initialFetch});
                }),
            )
            .subscribe(res => {
                this.hasMore = res.hasMore;
                this.loading = false;
                if (this._appliedParamsHasChanges(this.searchParamsResolver.resolve(this.route.snapshot), this._appliedParams)) {
                    this.posts = res.items.map(p => new PostBriefView(p));
                } else {
                    this.posts = this.posts.concat(res.items.map(p => new PostBriefView(p)));
                }
                this._appliedParams = this.searchParamsResolver.resolve(this.route.snapshot);
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
        if (this._routeParamsSubscription) {
            this._routeParamsSubscription.unsubscribe();
        }
    }
}
