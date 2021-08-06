import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UniqueConstraintError } from 'sequelize';
import { AccountErrors } from './errors/account.errors';
import { AccountDto } from './account.dto';
import { Account } from './account.entity';
import { ACCOUNT_REPOSITORY } from './constants';

@Injectable()
export class AccountService {
    constructor(
        @Inject(ACCOUNT_REPOSITORY)
        private accountRepository: typeof Account,
    ) {}

    public async create(dto: AccountDto): Promise<Account> {
        try {
            const account = await this.accountRepository.create<Account>(dto);
            return await account.save();
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new BadRequestException(AccountErrors.DuplicatedEmail);
            }
        }
    }

    public async findById(id: number): Promise<Account> {
        return this.accountRepository.findOne<Account>({ where: { id } });
    }

    public async findUserByEmail(email: string): Promise<Account> {
        return this.accountRepository.findOne<Account>({ where: { email } });
    }
}
