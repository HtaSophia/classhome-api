import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ObjectIdPipe } from './pipes/object-id.pipe';
import { ClassModule } from './class/class.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/classhome', { useFindAndModify: false }),
        AuthModule,
        AccountModule,
        ClassModule,
        ChatModule,
    ],
    controllers: [],
    providers: [ObjectIdPipe],
})
export class AppModule {}
