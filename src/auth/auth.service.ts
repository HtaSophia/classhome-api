import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../account/account.schema';
import { AccountService } from '../account/account.service';
import { AccountInfo } from './types/account-info';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private accountService: AccountService) {}

    public async validateUser(email: string, password: string): Promise<Account> {
        const account = await this.accountService.findUserByEmail(email);
        let accountInfo: Account;

        if (account) {
            const isPasswordMatch = this.comparePassword(password, account.password);

            if (isPasswordMatch) {
                accountInfo = account;
            }
        }

        return accountInfo;
    }

    public login(user: AccountInfo): JwtPayload {
        return {
            user,
            token: this.jwtService.sign(user),
        };
    }

    public comparePassword(password: string, accountPassword: string): boolean {
        return !!(password === accountPassword);
    }
}
