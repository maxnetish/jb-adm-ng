import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {PostDetails} from '../resources/post/post-details';
import {PostAllowRead} from '../resources/post/post-allow-read.enum';
import {PostContentType} from '../resources/post/post-content-type.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContentPresentationMode} from './content-presentation-mode.enum';
import {UploadFileModal} from '../widgets/upload-file-dialog/upload-file-dialog.component';
import {FileStoreService} from '../resources/file/file-store.service';
import {CommonDialogModal} from '../widgets/jb-common-dialog/jb-common-dialog.component';
import {CommonDialogType} from '../widgets/jb-common-dialog/common-dialog-type.enum';
import {CommonDialogResult} from '../widgets/jb-common-dialog/common-dialog-result.enum';
import {JB_TOOLBOX_TARGET} from '../widgets/jb-toolbox-outlet/jb-toolbox-outlet.component';
import {MatSnackBar} from '@angular/material';
import {PostUpdate} from '../resources/post/post-update';
import {PostService} from '../resources/post/post.service';
import {JbTemplateInjectorService} from '../widgets/jb-toolbox-outlet/jb-template-injector.service';

// import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jb-adm-page-post-edit',
    templateUrl: './page-post-edit.component.html',
    styleUrls: ['./page-post-edit.component.less']
})
export class PagePostEditComponent implements OnInit, AfterViewInit, OnDestroy {

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
    savingNow = false;

    readonly PostEditForm = this.fb.group({
        allowRead: [null],
        hru: [null],
        title: [null, [Validators.required]],
        contentType: [PostContentType.MD],
        brief: [null],
        content: [null, [Validators.required]],
        titleImg: [null],
        tags: [[]],
        contentPresentationMode: [ContentPresentationMode.EDIT]
    });

    @ViewChild('toInjectToMenu') private toInjectToMenu: TemplateRef<any>;

    onFileAttachmentsAddClick(e) {
        this.uploadFileModal.show({postId: this.post._id})
            .then(uploadedFileInfo => {
                if (!uploadedFileInfo) {
                    return;
                }
                const fileInfo = this.fileStoreService.jbUploadedFileInfo2JbFileFindInfo(uploadedFileInfo);
                this.post.attachments.push(fileInfo);
            })
            .then(null, err => {
                console.warn(err);
            });
    }

    onRemoveAttachmentButtonClick(attachmentIndex: number) {
        this.commonDialog.show({
                title: 'Remove file',
                commonDialogType: CommonDialogType.CONFIRM,
                message: `Remove attachment? File <b>${this.post.attachments[attachmentIndex].metadata.originalName}</b>
                         will be removed forever with post saving.`
            })
            .then(result => {
                if (result === CommonDialogResult.YES) {
                    this.post.attachments.splice(attachmentIndex, 1);
                }
            })
            .then(null, err => {
                console.warn(err);
            });

    }

    onFormSubmit(e: UIEvent, form: FormGroup) {
        e.preventDefault();

        if (form.invalid) {
            return;
        }

        this.savingNow = true;

        const postUpdate: PostUpdate = {
            _id: this.post._id,
            allowRead: this.PostEditForm.value.allowRead,
            attachments: this.post.attachments ? this.post.attachments.map(att => ({id: att.id || att._id})) : [],
            brief: this.PostEditForm.value.brief,
            content: this.PostEditForm.value.content,
            contentType: this.PostEditForm.value.contentType,
            hru: this.PostEditForm.value.hru,
            tags: this.PostEditForm.value.tags,
            title: this.PostEditForm.value.title,
            titleImg: this.PostEditForm.value.titleImg ?
                {id: this.PostEditForm.value.titleImg.id || this.PostEditForm.value.titleImg._id} : undefined,
        };

        this.postService.createOrUpdate(postUpdate)
            .subscribe(updatedPost => {
                this.savingNow = false;
                this.snackBar.open('Jah bless! Saved successfully!', null, {duration: 3000});
                this._updateInternalModel({postDetails: updatedPost});
                this.PostEditForm.markAsPristine();
            }, err => {
                console.warn(err);
                this.savingNow = false;
                this.snackBar.open('Something went wrong. See console.', null, {duration: 10000});
            }, () => {
                this.savingNow = false;
            });
    }

    private _updateInternalModel({postDetails}: { postDetails: PostDetails }) {
        this.post = Object.assign({}, postDetails);
        this.PostEditForm.patchValue(postDetails);
    }

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private uploadFileModal: UploadFileModal,
        private fileStoreService: FileStoreService,
        private commonDialog: CommonDialogModal,
        private templateInjector: JbTemplateInjectorService,
        private snackBar: MatSnackBar,
        private postService: PostService
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: Data) => this._updateInternalModel(data as { postDetails: PostDetails }));
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.templateInjector.emitTemplate(this.toInjectToMenu, JB_TOOLBOX_TARGET), 0);
    }

    ngOnDestroy(): void {
        this.templateInjector.emitTemplate(null, JB_TOOLBOX_TARGET);
    }
}
