import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Account } from '../../account/account.schema';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            roles = this.reflector.get<string[]>('roles', context.getClass());

            if (!roles) return true;
        }

        const user = context.switchToHttp().getRequest<Request>().user as Account;

        const hasRole = roles.includes(user.role);

        return user && user.role && hasRole;
    }
}
