import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectIdTransform } from '../shared/types/object-id-helper';
import { Account } from '../account/account.schema';
import { Roles } from '../account/enum/roles.enum';
import { ClassDto } from './dtos/class.dto';
import { Class, ClassDocument } from './class.schema';

@Injectable()
export class ClassService {
    private logger: Logger;
    private REMOVE_PASSWORD: string = '-password';

    public get classes(): Model<ClassDocument> {
        return this.classModel;
    }

    constructor(@InjectModel('Class') private readonly classModel: Model<ClassDocument>) {
        this.logger = new Logger(ClassService.name);
    }

    public async create(dto: ClassDto): Promise<Class> {
        this.logger.log('Creating class with name: ' + dto.name);
        const { professor, ...rest } = dto;

        return this.classes
            .create({ ...rest, professor: ObjectIdTransform(professor) });
    }

    public async getAll(user: Account): Promise<Class[]> {
        if (user.role === Roles.PROFESSOR) {
            this.logger.log("Returning professor's classes ... ");
            return this.classes
                .find({ professor: user._id })
                .populate('professor', this.REMOVE_PASSWORD)
                .populate('students', this.REMOVE_PASSWORD);
        }

        this.logger.log("Returning students's classes ... ");

        return this.classes
            .find({ students: user._id })
            .populate('professor', this.REMOVE_PASSWORD)
            .populate('students', this.REMOVE_PASSWORD);
    }

    public async getById(id: string): Promise<Class> {
        this.logger.log("Retrieving class with ID: " + id);

        return this.classes
            .findById(id.trim())
            .populate('professor', this.REMOVE_PASSWORD)
            .populate('students', this.REMOVE_PASSWORD);
    }

    public async update(classId: string, dto: Partial<ClassDto>): Promise<Class> {
        this.logger.log('Updating class with ID: ' + classId);
        const { students, ...rest } = dto

        return this.classes
            .findByIdAndUpdate(
                classId.trim(),
                { ...rest },
                { new: true }
            )
            .populate('professor', this.REMOVE_PASSWORD)
            .populate('students', this.REMOVE_PASSWORD);
    }

    public async addStudents(classId: string, studentId: string): Promise<Class> {
        this.logger.log('Adding student id: ' + studentId + ' to class with ID: ' + classId);
        const objStudentId = ObjectIdTransform(studentId.trim());

        return await this.classes
            .findByIdAndUpdate(classId.trim(),
                {
                    $push:
                        { students: objStudentId }
                },
                { new: true }
            )
            .populate('professor', this.REMOVE_PASSWORD)
            .populate('students', this.REMOVE_PASSWORD);
    }

    public async removeStudent(classId: string, studentId: string): Promise<Class> {
        this.logger.log('Removing student id: ' + studentId + ' from class with ID: ' + classId);
        const objStudentId = ObjectIdTransform(studentId.trim());

        return await this.classes
            .findByIdAndUpdate(classId.trim(),
                {
                    $pull:
                        { students: objStudentId }
                },
                { new: true }
            )
            .populate('professor', this.REMOVE_PASSWORD)
            .populate('students', this.REMOVE_PASSWORD);
    }

    public async delete(id: string): Promise<HttpStatus> {
        this.logger.log('Deleting class with ID: ' + id);
        const objClassId = ObjectIdTransform(id.trim())
        const deletedClass = await this.classes.findByIdAndDelete(objClassId);
        
        if (deletedClass) {
            this.logger.log('Deleted class with ID: ' + id);

            return HttpStatus.NO_CONTENT;
        }

        return HttpStatus.NOT_FOUND;
    }

    
}