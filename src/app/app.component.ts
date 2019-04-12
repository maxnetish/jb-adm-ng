import {Component, TemplateRef} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
    selector: 'jb-adm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {

    toolBoxInjectedTemplate: TemplateRef<any>;

    constructor(
        private authService: AuthService,
    ) {
        authService.loggedIn()
            .then(loggedIn => {
                this.loggedIn = loggedIn;
            });
    }

    loggedIn = false;
}
