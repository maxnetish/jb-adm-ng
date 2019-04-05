import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PassportCredentials} from '../resources/admin/passport-credentials';
import {User} from '../resources/admin/user';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'jb-adm-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.less']
})
export class PageLoginComponent implements OnInit {

    constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    }

    loginForm = new FormGroup(
        {
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        }
    );

    message: string = null;

    user: User = {};

    async onFormSubmit(formValue) {
        const creds: PassportCredentials = {
            username: formValue['username'],
            password: formValue['password']
        };
        try {
            const loginResult = await this.authService.login(creds);
            this.message = loginResult.message;
            this.user = loginResult.user;
            const next = this.route.snapshot.paramMap.get('next');
            if (next) {
                return this.router.navigate([next]);
            }
            return true;
        } catch (ex) {
            this.message = ex.error && ex.error.message;
        }
    }

    async onLogoutClick() {
        try {
            const loginResult = await this.authService.logout();
            this.message = loginResult.message;
            this.user = loginResult.user;
        } catch (ex) {
            this.message = ex.error && ex.error.message;
        }
    }

    onSubmitButtonClick(e) {
        console.log(e);
    }

    ngOnInit() {
        this.authService.user
            .subscribe(user => {
                this.user = user;
            });
    }

}
