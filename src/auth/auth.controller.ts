/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountDto } from '../account/account.dto';
import { AccountService } from '../account/account.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { JwtPayload } from './types/jwt-payload';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private accountService: AccountService) {}

    @Post('signin')
    public async signin(@Body() signInInfo: SignInDto): Promise<JwtPayload> {
        const account = await this.authService.validateUser(signInInfo.email, signInInfo.password);

        if (!account) {
            throw new UnauthorizedException();
        }

        const { id, username, email, role } = account;
        return this.authService.login({ id: id as number, email, username, role });
    }

    @Post('signup')
    public async signup(@Body() accountInfo: AccountDto): Promise<JwtPayload> {
        const account = await this.accountService.create(accountInfo);

        const { id, username, email, role } = account;
        return this.authService.login({ id: id as number, email, username, role });
    }
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
