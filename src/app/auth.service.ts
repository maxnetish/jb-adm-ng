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

    private _user: Observable<User> = this.adminService.user()
        .pipe(
            map(user => ({
                userName: user['userName'],
                role: user['role']
            })),
            catchError(err => of({}))
        );

    get user(): Observable<User> {
        return this._user;
    }

    loggedIn(): Promise<boolean> {
        return new Promise((resolve) => {
            this.user.subscribe(user => {
                resolve(!!user.userName);
            });
        });
    }

    login(credentials: PassportCredentials): Promise<LoginResult> {
        return new Promise<LoginResult>((resolve, reject) => {
            this.adminService.login(credentials)
                .subscribe(loginResult => {
                    this._user = of(loginResult.user);
                    resolve({
                        user: Object.assign({}, loginResult.user),
                        message: loginResult.message
                    });
                }, err => {
                    reject(err);
                });
        });
    }

    logout(): Promise<LoginResult> {
        return new Promise<LoginResult>((resolve, reject) => {
            this.adminService.logout()
                .subscribe(loginResult => {
                    this._user = of({});
                    resolve({
                        user: {},
                        message: loginResult.message
                    });
                }, err => {
                    reject(err);
                });
        });
    }
}
