import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {PostDetails} from '../resources/post/post-details';
import {PostAllowRead} from '../resources/post/post-allow-read.enum';
import {PostContentType} from '../resources/post/post-content-type.enum';
import {PostStatus} from '../resources/post/post-status.enum';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'jb-adm-page-post-edit',
    templateUrl: './page-post-edit.component.html',
    styleUrls: ['./page-post-edit.component.less']
})
export class PagePostEditComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    readonly PostAllowReadOptions = [
        PostAllowRead.FOR_ALL,
        PostAllowRead.FOR_REGISTERED,
        PostAllowRead.FOR_ME
    ];

    post: PostDetails;

    readonly PostEditForm = this.fb.group({
        allowRead: [null],
        hru: [null],
        title: [null]
    });

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.post = Object.assign({}, data.postDetails);
            this.PostEditForm.patchValue(data.postDetails);
            // Object.assign(this.post, data.postDetails);
        });
    }

}
