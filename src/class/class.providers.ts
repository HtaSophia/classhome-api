import { CLASS_REPOSITORY } from './class.constants';
import { ClassEntity } from './class.entity';

export const classProviders = [
    {
        provide: CLASS_REPOSITORY,
        useValue: ClassEntity,
    },
];