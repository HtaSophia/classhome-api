import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectIdTransform } from '../shared/types/object-id-helper';
import { Account } from '../account/account.schema';
import { Roles } from '../account/enum/roles.enum';
import { ClassDto } from './class.dto';
import { Class, ClassDocument } from './class.schema';

@Injectable()
export class ClassService {
    private logger: Logger;

    public get classes(): Model<ClassDocument> {
        return this.classModel;
    }

    constructor(@InjectModel('Class') private readonly classModel: Model<ClassDocument>) {
        this.logger = new Logger(ClassService.name);
    }

    public async create(dto: ClassDto): Promise<Class> {
        const { professor, ...rest } = dto;
        return this.classes.create({ ...rest, professor: ObjectIdTransform(professor) });
    }

    public async getAll(user: Account): Promise<Class[]> {
        if (user.role === Roles.PROFESSOR) {
            return this.classes
                .find({ professor: user._id })
                .populate('professor')
                .populate('students');
        }

        return this.classes
            .find({ students: user._id })
            .populate('professor')
            .populate('students');
    }
}
