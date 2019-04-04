import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {BsDatepickerConfig, BsDatepickerModule, BsDaterangepickerConfig} from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap/modal';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Page404Component} from './page404/page404.component';
import {PagePostsListComponent} from './page-posts-list/page-posts-list.component';
import {SearchFormComponent} from './page-posts-list/search-form/search-form.component';
import {SearchResultComponent} from './page-posts-list/search-result/search-result.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {PagePostEditComponent} from './page-post-edit/page-post-edit.component';
import {PostStatusBadgeComponent} from './widgets/post-status-badge/post-status-badge.component';
import {PostStatusDisplayPipe} from './resources/post/post-status-display.pipe';
import {PostAllowReadDisplayPipe} from './resources/post/post-allow-read-display.pipe';
import {DefaultDisplayTextPipe} from './utils/default-display-text.pipe';
import {PostContentTypeDisplayPipe} from './resources/post/post-content-type-display.pipe';
import {AceEditorComponent} from './widgets/ace-editor/ace-editor.component';
import {ContentPresentationModeDisplayPipe} from './page-post-edit/content-presentation-mode-display.pipe';
import {PostContentPreviewPipe} from './page-post-edit/post-content-preview.pipe';
import {AvatarImageAddComponent} from './widgets/avatar-image-add/avatar-image-add.component';
import {JbCropperComponent} from './widgets/jb-cropper/jb-cropper.component';
import {TitleImageFormControlChooserComponent} from './widgets/title-image-form-control-chooser/title-image-form-control-chooser.component';
import {TagsFormControlComponent} from './widgets/tags-form-control/tags-form-control.component';
import {PrependBackendHostPipe} from './utils/prepend-backend-host.pipe';
import {UploadFileComponent} from './widgets/upload-file-dialog/upload-file-dialog.component';
import {JbFileInputDirective} from './widgets/jb-file-input.directive';
import {ContentTypeToIconPipe} from './utils/content-type-to-icon.pipe';
import {JbCommonDialogComponent} from './widgets/jb-common-dialog/jb-common-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        Page404Component,
        PagePostsListComponent,
        SearchFormComponent,
        SearchResultComponent,
        PageLoginComponent,
        PagePostEditComponent,
        PostStatusBadgeComponent,
        PostStatusDisplayPipe,
        PostAllowReadDisplayPipe,
        DefaultDisplayTextPipe,
        PostContentTypeDisplayPipe,
        AceEditorComponent,
        ContentPresentationModeDisplayPipe,
        PostContentPreviewPipe,
        AvatarImageAddComponent,
        JbCropperComponent,
        TitleImageFormControlChooserComponent,
        TagsFormControlComponent,
        PrependBackendHostPipe,
        UploadFileComponent,
        JbFileInputDirective,
        ContentTypeToIconPipe,
        JbCommonDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgSelectModule,

        // ngx buttons directives
        ButtonsModule.forRoot(),

        // ngx datepicker
        BsDatepickerModule.forRoot(),

        // ngx modal
        ModalModule.forRoot()
    ],
    providers: [
        {
            // set blue theme for ngx datepicker control
            provide: BsDatepickerConfig,
            useFactory: () => {
                const customConfig = new BsDatepickerConfig();
                customConfig.containerClass = 'theme-blue';
                return customConfig;
            }
        },
        {
            provide: BsDaterangepickerConfig,
            useFactory: () => {
                const customConfig = new BsDaterangepickerConfig();
                customConfig.containerClass = 'theme-blue';
                return customConfig;
            }
        }
    ],
    /**
     * entryComponents - components that will instantiates from code, not from markup
     * Such as modals
     */
    entryComponents: [AvatarImageAddComponent, UploadFileComponent, JbCommonDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
