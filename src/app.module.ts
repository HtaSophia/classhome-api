import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ObjectIdPipe } from './pipes/object-id.pipe';
import { ClassModule } from './class/class.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/classhome', { useCreateIndex: true }),
        AuthModule,
        AccountModule,
        ClassModule,
    ],
    controllers: [],
    providers: [ObjectIdPipe],
})
export class AppModule {}
