import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Account } from '../../account/account.schema';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Account => {
        const request = ctx.switchToHttp().getRequest<Request>();
        return request.user as Account;
    },
);
