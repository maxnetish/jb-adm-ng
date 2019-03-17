import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Page404Component} from './page404/page404.component';
import {PagePostsListComponent} from './page-posts-list/page-posts-list.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
    {path: 'login', component: PageLoginComponent},
    {path: 'posts', component: PagePostsListComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/posts', pathMatch: 'full'},
    {path: '**', component: Page404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
