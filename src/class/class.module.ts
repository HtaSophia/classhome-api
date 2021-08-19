import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClassController } from './class.controller';
import { classProviders } from './class.providers';
import { ClassService } from './class.service';

@Module({
  imports: [DatabaseModule],
  providers: [ClassService, ...classProviders],
  controllers: [ClassController]
})
export class ClassModule {}
