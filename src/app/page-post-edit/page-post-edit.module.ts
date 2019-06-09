import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagePostEditComponent} from './page-post-edit.component';
import {ContentPresentationModeDisplayPipe} from './content-presentation-mode-display.pipe';
import {PagePostResolverService} from './page-post-resolver.service';
import {PostContentPreviewPipe} from './post-content-preview.pipe';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {JbMaterialStaticFormFieldModule} from '../widgets/jb-material-static-form-field/jb-material-static-form-field.module';
import {PostStatusBadgeModule} from '../widgets/post-status-badge/post-status-badge.module';
import {DefaultDisplayTextModule} from '../utils/default-display-text.pipe';
import {PostAllowReadDisplayModule} from '../utils/post-allow-read-display.pipe';
import {TitleImageFormControlChooserModule} from '../widgets/title-image-form-control-chooser/title-image-form-control-chooser.module';
import {TagsFormControlModule} from '../widgets/tags-form-control/tags-form-control.module';
import {ContentTypeToIconModule} from '../utils/content-type-to-icon.pipe';
import {PrependBackendHostModule} from '../utils/prepend-backend-host.pipe';
import {PostContentTypeDisplayModule} from '../utils/post-content-type-display.pipe';
import {AceEditorModule} from '../widgets/ace-editor/ace-editor.module';
import {AvatarImageAddModule} from '../widgets/avatar-image-add/avatar-image-add.module';
import {JbCommonDialogModule} from '../widgets/jb-common-dialog/jb-common-dialog.module';
import {UploadFileDialogModule} from '../widgets/upload-file-dialog/upload-file-dialog.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        JbMaterialStaticFormFieldModule,
        PostStatusBadgeModule,
        DefaultDisplayTextModule,
        MatSelectModule,
        PostAllowReadDisplayModule,
        MatInputModule,
        TitleImageFormControlChooserModule,
        TagsFormControlModule,
        ContentTypeToIconModule,
        PrependBackendHostModule,
        MatRadioModule,
        PostContentTypeDisplayModule,
        AceEditorModule,
        MatButtonToggleModule,
        AvatarImageAddModule,
        JbCommonDialogModule,
        UploadFileDialogModule,
        MatSnackBarModule,
    ],
    declarations: [
        PagePostEditComponent,
        ContentPresentationModeDisplayPipe,
        PostContentPreviewPipe,
    ],
    providers: [
        PagePostResolverService,
    ],
})
export class PagePostEditModule {
}
