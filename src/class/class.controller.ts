import { RolesGuard } from './../auth/guards/roles.guard';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ObjectIdPipe } from '../pipes/object-id.pipe';
import { Account } from '../account/account.schema';
import { User } from '../auth/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ClassDto } from './dtos/class.dto';
import { Class } from './class.schema';
import { ClassService } from './class.service';
import { ObjectId } from '../shared/types/object-id-helper';
import { AddStudentDto } from './dtos/add-student.dto';
import { Roles } from 'src/account/enum/roles.enum';
import { hasRole } from 'src/auth/decorators/roles.decorator';

@Controller('class')
@UseGuards(JwtGuard, RolesGuard)
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @hasRole(Roles.PROFESSOR)
    @Post()
    public async create(@Body() dto: ClassDto): Promise<Class> {
        return this.classService.create(dto);
    }

    @Get()
    public async getAll(@User() user: Account): Promise<Class[]> {
        return this.classService.getAll(user);
    }

    @Get(':id')
    public async getById(@Param('id', ObjectIdPipe) _id: ObjectId): Promise<Class> {
        return this.classService.getById(_id);
    }

    @hasRole(Roles.PROFESSOR)
    @Put(':id')
    public async update(@Param('id', ObjectIdPipe) _id: ObjectId, @Body() dto: Partial<ClassDto>): Promise<Class> {
        return this.classService.update(_id, dto);
    }

    @hasRole(Roles.PROFESSOR)
    @Post(':id/student')
    public async addStudent(@Param('id', ObjectIdPipe) _id: ObjectId, @Body() dto: AddStudentDto): Promise<Class> {
        return this.classService.addStudents(_id, dto.student);
    }

    @hasRole(Roles.PROFESSOR)
    @Delete(':id/student')
    public async removeStudent(
        @Param('id', ObjectIdPipe) _id: ObjectId,
        @Query('student', ObjectIdPipe) studentId: ObjectId,
    ): Promise<Class> {
        return this.classService.removeStudent(_id, studentId);
    }

    @hasRole(Roles.PROFESSOR)
    @Delete(':id')
    public async deleteClass(@Param('id', ObjectIdPipe) _id: ObjectId): Promise<HttpStatus> {
        return this.classService.delete(_id);
    }
}
