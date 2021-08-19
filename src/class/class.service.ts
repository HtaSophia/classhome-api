import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CLASS_LOG_MESSAGES, CLASS_REPOSITORY } from './class.constants';
import { CreateClassDto } from './class.dto';
import { ClassEntity } from './class.entity';

@Injectable()
export class ClassService {
    constructor(
        @Inject(CLASS_REPOSITORY)
        private readonly classRepository: typeof ClassEntity,
    ) {}

    private readonly logger = new Logger(ClassService.name)

}
