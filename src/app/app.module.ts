import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
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

@NgModule({
    declarations: [
        AppComponent,
        Page404Component,
        PagePostsListComponent,
        SearchFormComponent,
        SearchResultComponent,
        PageLoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
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
