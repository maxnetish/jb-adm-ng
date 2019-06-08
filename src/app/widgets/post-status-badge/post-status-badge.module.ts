import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostStatusBadgeComponent} from './post-status-badge.component';
import {PostStatusDisplayPipe} from './post-status-display.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PostStatusBadgeComponent,
        PostStatusDisplayPipe,
    ],
    exports: [
        PostStatusBadgeComponent,
        PostStatusDisplayPipe,
    ]
})
export class PostStatusBadgeModule {
}
