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

@Controller('class')
@UseGuards(JwtGuard)
export class ClassController {
    constructor(private readonly classService: ClassService) {}

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

    @Put(':id')
    public async update(@Param('id', ObjectIdPipe) _id: ObjectId, @Body() dto: Partial<ClassDto>): Promise<Class> {
        return this.classService.update(_id, dto);
    }

    @Post(':id/student')
    public async addStudent(@Param('id', ObjectIdPipe) _id: ObjectId, @Body() dto: AddStudentDto): Promise<Class> {
        return this.classService.addStudents(_id, dto.student);
    }

    @Delete(':id/student')
    public async removeStudent(
        @Param('id', ObjectIdPipe) _id: ObjectId,
        @Query('student', ObjectIdPipe) studentId: ObjectId,
    ): Promise<Class> {
        return this.classService.removeStudent(_id, studentId);
    }

    @Delete(':id')
    public async deleteClass(@Param('id', ObjectIdPipe) _id: ObjectId): Promise<HttpStatus> {
        return this.classService.delete(_id);
    }
}
