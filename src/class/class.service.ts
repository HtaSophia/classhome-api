import { Inject, Injectable } from '@nestjs/common';
import { CLASS_REPOSITORY } from './class.constants';
import { ClassEntity } from './class.entity';

@Injectable()
export class ClassService {
    constructor(
        @Inject(CLASS_REPOSITORY)
        private classRepository: typeof ClassEntity,
        ){}
}
