import { AccountInfo } from './account-info';

export interface JwtPayload {
    user: AccountInfo;
    token: string;
}
