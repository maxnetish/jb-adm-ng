import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagePostsListComponent} from './page-posts-list.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule, MatNativeDateModule, MatSnackBarModule,
    MatTableModule
} from '@angular/material';
import {PostStatusBadgeModule} from '../widgets/post-status-badge/post-status-badge.module';
import {RouterModule} from '@angular/router';
import {IsInViewModule} from '../utils/is-in-view.directive';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {PagePostsListResolverService} from './page-posts-list-resolver.service';
import {PagePostsListSearchFormResolverService} from './search-form/search-form-resolver.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatTableModule,
        MatCheckboxModule,
        PostStatusBadgeModule,
        RouterModule,
        MatSnackBarModule,
        IsInViewModule,
        ScrollingModule,
    ],
    declarations: [
        PagePostsListComponent,
        SearchResultComponent,
        SearchFormComponent,
    ],
    providers: [
        PagePostsListResolverService,
        PagePostsListSearchFormResolverService,
    ]
})
export class PagePostListModule {
}
