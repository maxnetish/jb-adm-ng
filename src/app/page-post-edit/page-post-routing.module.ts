import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagePostEditComponent} from './page-post-edit.component';
import {AuthGuard} from '../auth.guard';
import {PagePostResolverService} from './page-post-resolver.service';

const routes: Routes = [
    {
        path: 'new',
        component: PagePostEditComponent,
        canActivate: [
            AuthGuard,
        ],
        resolve: {
            postDetails: PagePostResolverService,
        }
    },
    {
        path: ':id',
        component: PagePostEditComponent,
        canActivate: [
            AuthGuard,
        ],
        resolve: {
            postDetails: PagePostResolverService,
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class PagePostRoutingModule {
}
