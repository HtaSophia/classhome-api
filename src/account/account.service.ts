import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UniqueConstraintError } from 'sequelize';
import { AccountErrors } from './errors/account.errors';
import { AccountDto } from './account.dto';
import { Account } from './account.entity';
import { ACCOUNT_REPOSITORY, LOG_MESSAGES } from './constants';

@Injectable()
export class AccountService {
    constructor(
        @Inject(ACCOUNT_REPOSITORY)
        private accountRepository: typeof Account,
    ) {}

    private readonly logger = new Logger(AccountService.name)

    public async create(dto: AccountDto): Promise<Account> {
        this.logger.log(LOG_MESSAGES.Info.CreatingNewUser)
        try {
            return await this.accountRepository.create<Account>(dto);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                this.logger.error(LOG_MESSAGES.Error.DuplicatedEmail)
                throw new BadRequestException(AccountErrors.DuplicatedEmail);
            }
            else {
                this.logger.error('ERROR: ', error)
                throw new InternalServerErrorException(AccountErrors.UknownError)
            }
        }
    }

    public async findById(id: number): Promise<Account> {
        return this.accountRepository.findOne<Account>({ where: { id } });
    }

    public async findUserByEmail(email: string): Promise<Account> {
        this.logger.log('Searching for user.')
        return this.accountRepository.findOne<Account>({ where: { email } });
    }
}
