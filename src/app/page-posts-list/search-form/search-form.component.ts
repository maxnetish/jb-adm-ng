import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'jb-adm-posts-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.less']
})
export class SearchFormComponent implements OnInit {

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
        const queryParams = {
            q: formValue.q || undefined,
            from: formValue.from ? formValue.from.toISOString() : undefined,
            to: formValue.to ? formValue.to.toISOString() : undefined,
            pages: 1
        };
        this.router.navigate(['/posts'], {
            queryParams,
            queryParamsHandling: 'merge'
        });
    }

    ngOnInit() {
        const self = this;
        const {queryParamMap} = this.route;
        queryParamMap.subscribe(paramsAsMap => {
            const newParams = {
                q: paramsAsMap.has('q') ? paramsAsMap.get('q') : null,
                from: paramsAsMap.has('from') ? new Date(paramsAsMap.get('from')) : null,
                to: paramsAsMap.has('to') ? new Date(paramsAsMap.get('to')) : null
            };
            self.searchForm.patchValue(newParams);
        });
    }

}
