import {EventEmitter, Injectable} from '@angular/core';
import {User} from './resources/admin/user';
import {AdminService} from './resources/admin/admin.service';
import {PassportCredentials} from './resources/admin/passport-credentials';
import {LoginResult} from './resources/admin/login-result';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends EventEmitter<User> {

    constructor(private adminService: AdminService) {
        super(true);
        this.fetchUser();
    }

    private _user: User = null;

    private fetchUser() {
        this.adminService.user()
            .subscribe(user => {
                this._user = {
                    userName: user['userName'],
                    role: user['role']
                };
                this.emit(this.user);
            }, err => {
                this._user = {};
                this.emit(this.user);
            });
    }

    get user(): User {
        if (this._user) {
            return Object.assign({}, this._user);
        }
        return {};
    }

    get loggedIn(): boolean {
        return !!(this.user && this.user.userName);
    }

    login(credentials: PassportCredentials): Promise<LoginResult> {
        return new Promise<LoginResult>((resolve, reject) => {
            this.adminService.login(credentials)
                .subscribe(loginResult => {
                    this._user = loginResult.user;
                    resolve({
                        user: Object.assign({}, this._user),
                        message: loginResult.message
                    });
                    this.emit(this.user);
                }, err => {
                    reject(err);
                });
        });
    }

    logout(): Promise<LoginResult> {
        return new Promise<LoginResult>((resolve, reject) => {
            this.adminService.logout()
                .subscribe(loginResult => {
                    this._user = {};
                    resolve({
                        user: {},
                        message: loginResult.message
                    });
                    this.emit(this.user);
                }, err => {
                    reject(err);
                });
        });
    }
}
