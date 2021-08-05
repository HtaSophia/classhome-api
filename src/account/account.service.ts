import { Inject, Injectable } from '@nestjs/common';
import { AccountDto } from './account.dto';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
    constructor(
        @Inject('ACCOUNT_REPOSITORY')
        private accountRepository: typeof Account,
    ) {}

    public async create(dto: AccountDto): Promise<Account> {
        const account = this.accountRepository.create<Account>(dto);
        return (await account).save();
    }

    public async findById(id: number): Promise<Account> {
        return this.accountRepository.findOne<Account>({ where: { id } });
    }

    public async findUserByEmail(email: string): Promise<Account> {
        return this.accountRepository.findOne<Account>({ where: { email } });
    }
}
