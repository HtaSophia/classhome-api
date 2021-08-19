import { ClassEntity } from './class.entity';
import { CLASS_REPOSITORY } from './class.constants';

export const classProviders = [
    {
        provide: CLASS_REPOSITORY,
        useValue: ClassEntity,
    },
];