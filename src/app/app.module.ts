import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Page404Component} from './page404/page404.component';
import {PagePostsListComponent} from './page-posts-list/page-posts-list.component';
import {SearchFormComponent} from './page-posts-list/search-form/search-form.component';
import {SearchResultComponent} from './page-posts-list/search-result/search-result.component';

@NgModule({
    declarations: [
        AppComponent,
        Page404Component,
        PagePostsListComponent,
        SearchFormComponent,
        SearchResultComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
