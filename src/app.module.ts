import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ObjectIdPipe } from './pipes/object-id.pipe';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/classhome'), AuthModule, AccountModule],
    controllers: [],
    providers: [ObjectIdPipe],
})
export class AppModule {}
