import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { classProviders } from './class.providers';

@Module({
  providers: [ClassService, ...classProviders],
  controllers: [ClassController]
})
export class ClassModule {}
