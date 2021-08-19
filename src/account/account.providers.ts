import { Account } from './account.entity';
import { ACCOUNT_REPOSITORY } from './account constants';

export const accountProviders = [
    {
        provide: ACCOUNT_REPOSITORY,
        useValue: Account,
    },
];
