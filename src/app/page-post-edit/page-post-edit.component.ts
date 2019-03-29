import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {PostDetails} from '../resources/post/post-details';
import {PostAllowRead} from '../resources/post/post-allow-read.enum';
import {PostContentType} from '../resources/post/post-content-type.enum';
import {FormBuilder, Validators} from '@angular/forms';
import {ContentPresentationMode} from './content-presentation-mode.enum';
import {AvatarImageAddModal} from '../widgets/avatar-image-add/avatar-image-add.component';
import {FileStoreService} from '../resources/file/file-store.service';

@Component({
    selector: 'jb-adm-page-post-edit',
    templateUrl: './page-post-edit.component.html',
    styleUrls: ['./page-post-edit.component.less']
})
export class PagePostEditComponent implements OnInit {

    readonly PostAllowReadOptions = [
        PostAllowRead.FOR_ALL,
        PostAllowRead.FOR_REGISTERED,
        PostAllowRead.FOR_ME
    ];

    readonly PostContentTypeOptions = [
        PostContentType.MD,
        PostContentType.HTML
    ];

    readonly ContentPresentationModeOptions = [
        {
            code: ContentPresentationMode.EDIT,
            icon: 'far fa-edit'
        },
        {
            code: ContentPresentationMode.PREVIEW,
            icon: 'far fa-eye'
        }
    ];

    readonly ContentPresentationModeValues = {
        [ContentPresentationMode.EDIT]: ContentPresentationMode.EDIT,
        [ContentPresentationMode.PREVIEW]: ContentPresentationMode.PREVIEW
    };

    post: PostDetails;

    private _titleImageSelectOpenedOnce = false;
    titleImagesLoading = false;
    titleImages = [];

    readonly PostEditForm = this.fb.group({
        allowRead: [null],
        hru: [null],
        title: [null, [Validators.required]],
        contentType: [PostContentType.MD],
        brief: [null],
        content: [null, [Validators.required]],
        titleImg: [null],

        contentPresentationMode: [ContentPresentationMode.EDIT]
    });

    onAddNewTitleImageClick() {
        this.avatarImageAddModal.show({
            croppieOptions: {
                viewport: {width: 100, height: 100, type: 'square'},
                boundary: {width: 200, height: 200}
            }
        }).then(result => {
            console.info(result);
        }, err => {
            console.warn(err);
        });
    }

    onSelectTitleImageOpen(e) {
        if (this._titleImageSelectOpenedOnce) {
            return;
        }
        this._titleImageSelectOpenedOnce = true;

        this.titleImagesLoading = true;

        this.fileStoreService.find({
            context: 'avatarImage',
            max: 1000
        }).toPromise()
            .then(findFileRespone => {
                // this.titleImages.length = 0;
                // Array.prototype.push.apply(this.titleImages, findFileRespone.items);
                this.titleImages = findFileRespone.items;
                this.titleImagesLoading = false;
            })
            .then(null, err => {
                this.titleImagesLoading = false;
                console.warn(err);
            });
    }

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private avatarImageAddModal: AvatarImageAddModal,
        private fileStoreService: FileStoreService
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.post = Object.assign({}, data.postDetails);
            this.PostEditForm.patchValue(data.postDetails);
            // Object.assign(this.post, data.postDetails);
        });
    }
}
