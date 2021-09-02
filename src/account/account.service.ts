import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERROR_MESSAGE } from '../shared/constants/error-message';
import { AccountDto } from './account.dto';
import { Account, AccountDocument } from './account.schema';
import { LOG_MESSAGES } from '../shared/constants/log-message';
import { ObjectId } from '../shared/types/object-id-helper';

@Injectable()
export class AccountService {
    private logger: Logger;

    public get accounts(): Model<AccountDocument> {
        return this.accountModel;
    }

    constructor(@InjectModel('Account') private readonly accountModel: Model<AccountDocument>) {
        this.logger = new Logger(AccountService.name);
    }

    public async create(dto: AccountDto): Promise<Account> {
        this.logger.log(LOG_MESSAGES.creatingNewUser);

        try {
            return await this.accountModel.create(dto);
        } catch (error) {
            this.logger.error('ERROR: ', error);
            throw new InternalServerErrorException(ERROR_MESSAGE.unknownError);
        }
    }

    public async findById(id: ObjectId): Promise<Account> {
        return this.accountModel.findById(id);
    }

    public async findUserByEmail(email: string): Promise<Account> {
        this.logger.log('Searching for user.');
        return this.accountModel.findOne({ email }).select('+password');
    }
}
