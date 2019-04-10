import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {PostDetails} from '../resources/post/post-details';
import {PostAllowRead} from '../resources/post/post-allow-read.enum';
import {PostContentType} from '../resources/post/post-content-type.enum';
import {FormBuilder, Validators} from '@angular/forms';
import {ContentPresentationMode} from './content-presentation-mode.enum';
import {UploadFileModal} from '../widgets/upload-file-dialog/upload-file-dialog.component';
import {FileStoreService} from '../resources/file/file-store.service';
import {CommonDialogModal} from '../widgets/jb-common-dialog/jb-common-dialog.component';
import {CommonDialogType} from '../widgets/jb-common-dialog/common-dialog-type.enum';
import {CommonDialogResult} from '../widgets/jb-common-dialog/common-dialog-result.enum';
// import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private uploadFileModal: UploadFileModal,
        private fileStoreService: FileStoreService,
        private commonDialog: CommonDialogModal
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
