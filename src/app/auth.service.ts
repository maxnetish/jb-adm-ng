import {Injectable} from '@angular/core';
import {User} from './resources/admin/user';
import {AdminService} from './resources/admin/admin.service';
import {PassportCredentials} from './resources/admin/passport-credentials';
import {LoginResult} from './resources/admin/login-result';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private adminService: AdminService) {
    }

    private _user: User = null;

    get user(): Promise<User> {
        if (this._user) {
            return Promise.resolve(this._user);
        }
        return this.adminService.user()
            .toPromise()
            .then(user => {
                this._user = Object.assign({}, user);
                return user;
            })
            .then(null, err => {
                this._user = {};
                return this._user;
            });
    }

    async loggedIn(): Promise<boolean> {
        const resolvedUser = await this.user;
        return !!resolvedUser.userName;
    }

    login(credentials: PassportCredentials): Promise<LoginResult> {
        return this.adminService.login(credentials)
            .toPromise()
            .then(loginResult => {
                this._user = Object.assign({}, loginResult.user);
                return loginResult;
            });
    }

    logout(): Promise<LoginResult> {
        return this.adminService.logout()
            .toPromise()
            .then(loginResult => {
                this._user = {};
                return {
                    user: {},
                    message: loginResult.message
                };
            });
    }
}
