import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxMaskModule} from 'ngx-mask';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Page404Component} from './page404/page404.component';
import {PagePostsListComponent} from './page-posts-list/page-posts-list.component';
import {SearchFormComponent} from './page-posts-list/search-form/search-form.component';
import {SearchResultComponent} from './page-posts-list/search-result/search-result.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {NgbDateStringAdapterService} from './utils/ngb-date-string-adapter.service';
import {NgbDateLocaleParserFormatterService} from './utils/ngb-date-locale-parser-formatter.service';
import { PagePostEditComponent } from './page-post-edit/page-post-edit.component';
import { PostStatusBadgeComponent } from './widgets/post-status-badge/post-status-badge.component';
import { PostStatusDisplayPipe } from './resources/post/post-status-display.pipe';
import { PostAllowReadDisplayPipe } from './resources/post/post-allow-read-display.pipe';
import { DefaultDisplayTextPipe } from './utils/default-display-text.pipe';
import { PostContentTypeDisplayPipe } from './resources/post/post-content-type-display.pipe';
import { AceEditorComponent } from './widgets/ace-editor/ace-editor.component';

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
        AceEditorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        /**
         * Provide custom adapter and formatter for date picker
         */
        {
            provide: NgbDateAdapter,
            useClass: NgbDateStringAdapterService
        },
        {
            provide: NgbDateParserFormatter,
            useClass: NgbDateLocaleParserFormatterService
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
