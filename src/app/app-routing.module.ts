import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Page404Component} from './page404/page404.component';
import {PagePostsListComponent} from './page-posts-list/page-posts-list.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {AuthGuard} from './auth.guard';
import {Page404module} from './page404/page404.module';
import {PageLoginModule} from './page-login/page-login.module';
import {PagePostListModule} from './page-posts-list/page-post-list.module';

const routes: Routes = [
    {
        path: 'login',
        component: PageLoginComponent,
    },
    {
        path: 'posts',
        component: PagePostsListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'post',
        loadChildren: './page-post-edit/page-post-edit.module#PagePostEditModule',
        // function form won't work with aot transpilation so use deprecated form
        // loadChildren: () => import('./page-post-edit/page-post-edit.module').then(mod => mod.PagePostEditModule),
        // canLoad: [AuthGuard],
    },
    {
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: Page404Component,
    },

    // {path: '', component: PageExampleComponent, outlet: 'outlet-for-toolbox'},
    // {path: 'p', component: PageExampleComponent, outlet: 'outlet-for-toolbox'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {enableTracing: true}),
        /**
         * Page modules
         */
        Page404module,
        PageLoginModule,
        // PagePostEditModule,
        PagePostListModule,
    ],
    exports: [
        RouterModule
    ],
    providers: [
        // PagePostResolverService
    ]
})
export class AppRoutingModule {
}
