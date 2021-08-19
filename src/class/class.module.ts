import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { classProviders } from './class.providers';
import { ClassService } from './class.service';

@Module({
  imports: [DatabaseModule],
  providers: [ClassService, ...classProviders]
})
export class ClassModule {}
