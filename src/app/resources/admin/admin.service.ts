import {Injectable} from '@angular/core';
import {PassportCredentials} from './passport-credentials';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResult} from './login-result';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './user';
import {ResourcesUtilsService} from '../resources-utils.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient,
        private resourcesUtils: ResourcesUtilsService
    ) {
    }

    login(credentials: PassportCredentials): Observable<LoginResult> {
        const actualUrl = this.resourcesUtils.prependHostTo('/admin/login');

        let formData = new HttpParams();
        for (const key in credentials) {
            if (!credentials.hasOwnProperty(key)) {
                continue;
            }
            formData = formData.set(key, credentials[key]);
        }

        return this.http.post<LoginResult>(actualUrl, formData, {
            observe: 'response',
            reportProgress: false,
            responseType: 'json',
            withCredentials: true
        })
            .pipe(
                map(httpResponse => httpResponse.body)
            );
    }

    user(): Observable<User> {
        const actualUrl = this.resourcesUtils.prependHostTo('/current/user');

        return this.http.get<User>(actualUrl, {
            observe: 'response',
            reportProgress: false,
            responseType: 'json',
            withCredentials: true
        })
            .pipe(
                map(httpResponse => httpResponse.body)
            );
    }

    logout(): Observable<LoginResult> {
        const actualUrl = this.resourcesUtils.prependHostTo('/admin/logout');

        return this.http.get<LoginResult>(actualUrl, {
            observe: 'response',
            reportProgress: false,
            responseType: 'json',
            withCredentials: true
        })
            .pipe(
                map(httpResponse => httpResponse.body)
            );
    }

}
