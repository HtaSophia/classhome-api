import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Account } from "src/account/account.schema";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor (private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as Account;

        return roles.includes(user.role)
    }

}
