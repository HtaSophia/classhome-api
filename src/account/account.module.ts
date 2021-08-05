import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { accountProviders } from './account.providers';
import { AccountService } from './account.service';

@Module({
    imports: [DatabaseModule],
    providers: [AccountService, ...accountProviders],
    exports: [AccountService],
})
export class AccountModule {}