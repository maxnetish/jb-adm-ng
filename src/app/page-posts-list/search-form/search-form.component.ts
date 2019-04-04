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
            between: new FormControl(null),
        }
    );

    onSearchSubmit({q, between}: { q?: string, between?: Date[] } = {}) {
        const queryParams: { [param: string]: string | Array<string> } = {
            q: q || undefined,
            between: (between && between.length) ? between.map(d => d.toISOString()) : undefined
        };

        this.router.navigate(['/posts'], {
            queryParamsHandling: 'merge',
            queryParams
        });
    }

    ngOnInit() {
        const self = this;
        const {queryParamMap: paramObservable} = this.route;
        paramObservable.subscribe(paramMap => {
            const valuesFromUrl = {
                q: paramMap.has('q') ? paramMap.get('q') : null,
                between: paramMap.has('between') ? paramMap.getAll('between').map(ds => new Date(ds)) : null
            };
            self.searchForm.setValue(valuesFromUrl);
        });
    }

}
