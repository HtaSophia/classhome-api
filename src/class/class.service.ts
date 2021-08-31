import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId, ObjectIdTransform } from '../shared/types/object-id-helper';
import { Account } from '../account/account.schema';
import { Roles } from '../account/enum/roles.enum';
import { ClassDto } from './dtos/class.dto';
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
        this.logger.log(`Creating class with name: ${dto.name}`);
        const { professor, ...rest } = dto;

        const newClass = await this.classes.create({ ...rest, professor: ObjectIdTransform(professor) });

        return this.getById(newClass._id);
    }

    public async getAll(user: Account): Promise<Class[]> {
        if (user.role === Roles.PROFESSOR) {
            this.logger.log("Returning professor's classes ... ");
            return this.classes
                .find({ professor: user._id })
                .populate('professor')
                .populate('students');
        }

        this.logger.log("Returning students' classes ... ");

        return this.classes
            .find({ students: user._id })
            .populate('professor')
            .populate('students');
    }

    public async getById(_id: ObjectId): Promise<Class> {
        this.logger.log(`Retrieving class with ID: ${_id.toString()}`);

        return this.classes
            .findOne({ _id })
            .populate('professor')
            .populate('students');
    }

    public async update(_id: ObjectId, dto: Partial<ClassDto>): Promise<Class> {
        this.logger.log(`Updating class with ID: ${_id.toString()}`);

        return this.classes
            .findOneAndUpdate({ _id }, { $set: dto }, { new: true })
            .populate('professor')
            .populate('students');
    }

    public async addStudents(_id: ObjectId, studentId: string): Promise<Class> {
        this.logger.log(`Adding student id: ${studentId} to class with ID: ${_id.toString()}`);

        return this.classes
            .findOneAndUpdate({ _id }, { $push: { students: ObjectIdTransform(studentId) } }, { new: true })
            .populate('professor')
            .populate('students');
    }

    public async removeStudent(_id: ObjectId, studentId: ObjectId): Promise<Class> {
        this.logger.log(`Removing student id: ${studentId.toString()} from class with ID: ${_id.toString()}`);

        return this.classes
            .findOneAndUpdate({ _id }, { $pull: { students: studentId } }, { new: true })
            .populate('professor')
            .populate('students');
    }

    public async delete(id: ObjectId): Promise<HttpStatus> {
        this.logger.log(`Deleting class with ID: ${id.toString()}`);
        const deletedClass = await this.classes.findOneAndRemove({ _id: id }).exec();

        if (deletedClass) {
            this.logger.log(`Deleted class with ID: ${id.toString()}`);

            return HttpStatus.OK;
        }

        return HttpStatus.NOT_FOUND;
    }
}
