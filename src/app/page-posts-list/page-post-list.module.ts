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
    ],
    declarations: [
        PagePostsListComponent,
        SearchResultComponent,
        SearchFormComponent,
    ]
})
export class PagePostListModule {
}
