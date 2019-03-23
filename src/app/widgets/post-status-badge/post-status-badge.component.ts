import {Component, Input, OnInit} from '@angular/core';
import {PostStatus} from '../../resources/post/post-status.enum';

@Component({
    selector: 'jb-adm-post-status-badge',
    templateUrl: './post-status-badge.component.html',
    styleUrls: ['./post-status-badge.component.less']
})
export class PostStatusBadgeComponent implements OnInit {
    @Input() status: PostStatus;

    classMap: { [param: string]: string } = {
        [PostStatus.PUB]: 'badge badge-danger',
        [PostStatus.DRAFT]: 'badge badge-primary'
    };

    constructor() {
    }

    ngOnInit() {
    }

}
