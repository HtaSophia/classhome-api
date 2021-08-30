import { UnauthorizedException } from "@nestjs/common";
import { Account } from "src/account/account.schema";
import { Roles } from "src/account/enum/roles.enum";

export function checkIfRoleIsProfessor(user: Account) {
    if (user.role !== Roles.PROFESSOR) {
        throw new UnauthorizedException("You dont't have permission to execute this operation");
    }
}

export class Utils {}