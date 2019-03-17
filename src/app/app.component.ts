import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
    selector: 'jb-adm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(private authService: AuthService) {
        this.loggedIn = authService.loggedIn;
        authService.subscribe(() => this.loggedIn = authService.loggedIn);
    }

    loggedIn = false;
}
