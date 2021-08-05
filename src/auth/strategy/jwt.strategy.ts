import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Account } from '../../account/account.entity';
import { AccountService } from '../../account/account.service';
import { jwtConstants } from '../constants';
import { AccountInfo } from '../types/account-info';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly accountService: AccountService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    public async validate(payload: AccountInfo): Promise<Account> {
        return this.accountService.findById(payload.id);
    }
}
