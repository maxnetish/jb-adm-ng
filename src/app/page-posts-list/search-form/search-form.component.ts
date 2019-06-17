import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsListFormSearchParams} from './search-form-resolver.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'jb-adm-posts-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.less']
})
export class SearchFormComponent implements OnInit, OnDestroy {

    private _routeDataSubscription: Subscription;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    searchForm = new FormGroup(
        {
            q: new FormControl('', [Validators.maxLength(64)]),
            'from': new FormControl(null),
            to: new FormControl(null)
        }
    );

    onSearchSubmit(formValue) {
        const matrixParams = {
            q: formValue.q || null,
            from: formValue.from ? formValue.from.toISOString() : null,
            to: formValue.to ? formValue.to.toISOString() : null,
            pages: 1
        };
        for (const key in matrixParams) {
            // we should clear empty params, because undefined or null writes in matrix param
            if (matrixParams[key] === null) {
                delete matrixParams[key];
            }
        }
        this.router.navigate(['/posts', matrixParams], {
            queryParamsHandling: 'merge'
        });
    }

    ngOnInit() {
        this._routeDataSubscription = this.route.data
            .subscribe(data => {
                const {resolvedSearchFormParams} = data as { resolvedSearchFormParams: Partial<PostsListFormSearchParams> };
                this.searchForm.patchValue(resolvedSearchFormParams);
            });
    }

    ngOnDestroy(): void {
        if (this._routeDataSubscription) {
            this._routeDataSubscription.unsubscribe();
        }
    }

}
