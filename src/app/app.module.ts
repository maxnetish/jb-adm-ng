import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

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
        JbCommonDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // NgbModule,
        // NgxMaskModule.forRoot(),
        NgSelectModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        /**
         * Provide custom adapter and formatter for date picker
         */
        // {
        //     provide: NgbDateAdapter,
        //     useClass: NgbDateStringAdapterService
        // },
        // {
        //     provide: NgbDateParserFormatter,
        //     useClass: NgbDateLocaleParserFormatterService
        // }
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
