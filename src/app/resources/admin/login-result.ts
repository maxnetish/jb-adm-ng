import {User} from './user';

export interface LoginResult {
    message?: string;
    user?: User;
}
