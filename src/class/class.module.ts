import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class, ClassSchema } from './class.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }])],
    providers: [ClassService],
    controllers: [ClassController],
})
export class ClassModule {}
