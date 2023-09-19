import { UserType } from './user-type.enum';

export interface User {
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    userType?: UserType;
}
