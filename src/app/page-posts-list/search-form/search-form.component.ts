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
            'from': new FormControl(''),
            to: new FormControl('')
        }
    );

    onSearchSubmit(formValue) {
        const matrixParams = {};
        for (const key in formValue) {
            if (formValue.hasOwnProperty(key) && formValue[key] && formValue[key].length !== 0) {
                matrixParams[key] = formValue[key];
            }
        }
        this.router.navigate(['/posts', matrixParams]);
    }

    ngOnInit() {
        const self = this;
        const {paramMap} = this.route;
        paramMap.subscribe(paramsAsMap => {
            paramsAsMap.keys.forEach(key => {
                if (self.searchForm.controls[key]) {
                    self.searchForm.controls[key].setValue(paramsAsMap.get(key));
                }
            });
        });
    }

}
