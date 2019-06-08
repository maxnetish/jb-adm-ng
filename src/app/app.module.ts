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
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkColumnDef, CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Page404Component} from './page404/page404.component';
import {PagePostsListComponent} from './page-posts-list/page-posts-list.component';
import {SearchFormComponent} from './page-posts-list/search-form/search-form.component';
import {SearchResultComponent} from './page-posts-list/search-result/search-result.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {PagePostEditComponent} from './page-post-edit/page-post-edit.component';
import {PostAllowReadDisplayPipe} from './resources/post/post-allow-read-display.pipe';
import {DefaultDisplayTextPipe} from './utils/default-display-text.pipe';
import {PostContentTypeDisplayPipe} from './resources/post/post-content-type-display.pipe';
import {ContentPresentationModeDisplayPipe} from './page-post-edit/content-presentation-mode-display.pipe';
import {PostContentPreviewPipe} from './page-post-edit/post-content-preview.pipe';
import {MatNativeDateModule} from '@angular/material';
import {AceEditorModule} from './widgets/ace-editor/ace-editor.module';
import {AvatarImageAddModule} from './widgets/avatar-image-add/avatar-image-add.module';
import {JbCommonDialogModule} from './widgets/jb-common-dialog/jb-common-dialog.module';
import {JbMaterialStaticFormFieldModule} from './widgets/jb-material-static-form-field/jb-material-static-form-field.module';
import {JbToolboxOutletModule} from './widgets/jb-toolbox-outlet/jb-toolbox-outlet.module';
import {PostStatusBadgeModule} from './widgets/post-status-badge/post-status-badge.module';
import {TagsFormControlModule} from './widgets/tags-form-control/tags-form-control.module';
import {PrependBackendHostModule} from './utils/prepend-backend-host.pipe';
import {TitleImageFormControlChooserModule} from './widgets/title-image-form-control-chooser/title-image-form-control-chooser.module';
import {UploadFileDialogModule} from './widgets/upload-file-dialog/upload-file-dialog.module';
import {ContentTypeToIconModule} from './utils/content-type-to-icon.pipe';

@NgModule({
    declarations: [
        AppComponent,
        Page404Component,
        PagePostsListComponent,
        SearchFormComponent,
        SearchResultComponent,
        PageLoginComponent,
        PagePostEditComponent,
        PostAllowReadDisplayPipe,
        DefaultDisplayTextPipe,
        PostContentTypeDisplayPipe,
        ContentPresentationModeDisplayPipe,
        PostContentPreviewPipe,
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
        MatRadioModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatGridListModule,
        MatCheckboxModule,
        CdkTableModule,
        CdkTreeModule,
        AceEditorModule,
        AvatarImageAddModule,
        JbCommonDialogModule,
        JbMaterialStaticFormFieldModule,
        JbToolboxOutletModule,
        PostStatusBadgeModule,
        TagsFormControlModule,
        PrependBackendHostModule,
        TitleImageFormControlChooserModule,
        UploadFileDialogModule,
        ContentTypeToIconModule,
    ],
    providers: [
        CdkColumnDef,
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                autoFocus: true,
                closeOnNavigation: true,
                disableClose: false,
                hasBackdrop: true,
                restoreFocus: false,
                role: 'dialog',
                width: '400px',
            }
        }
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
    bootstrap: [AppComponent],
})
export class AppModule {
}
