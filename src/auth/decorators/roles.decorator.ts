import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const UseRoles = (...roles: string[]): CustomDecorator => SetMetadata('roles', roles);
