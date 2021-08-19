import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ClassController } from './class/class.controller';
import { ClassService } from './class/class.service';
import { ClassModule } from './class/class.module';


@Module({
    imports: [DatabaseModule, AuthModule, AccountModule, ClassModule],
    controllers: [AppController, ClassController],
    providers: [AppService, ClassService],
})
export class AppModule {}
