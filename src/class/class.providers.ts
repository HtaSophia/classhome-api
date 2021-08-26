import { CLASS_REPOSITORY } from './class.constants';
import { Class } from './class.entity';

export const classProviders = [
    {
        provide: CLASS_REPOSITORY,
        useValue: Class,
    },
];