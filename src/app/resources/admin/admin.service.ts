import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PassportCredentials} from './passport-credentials';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResult} from './login-result';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './user';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {
    }

    login(credentials: PassportCredentials): Observable<LoginResult> {
        const baseUrl = '/admin/login';
        const actualUrl = environment.backendHostUrl ? environment.backendHostUrl + baseUrl : baseUrl;

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
        const baseUrl = '/current/user';
        const actualUrl = environment.backendHostUrl ? environment.backendHostUrl + baseUrl : baseUrl;

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
        const baseUrl = '/admin/logout';
        const actualUrl = environment.backendHostUrl ? environment.backendHostUrl + baseUrl : baseUrl;

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
