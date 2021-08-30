import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Account } from '../account/account.schema';
import { User } from '../auth/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ClassDto } from './dtos/class.dto';
import { Class } from './class.schema';
import { ClassService } from './class.service';
import { StudentDto } from './dtos/student.dto';
import { checkIfRoleIsProfessor } from '../shared/utils/functions.utils';

@Controller('class')
@UseGuards(JwtGuard)
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Post()
    public async create(@User() user: Account, @Body() dto: ClassDto): Promise<Class> {
        checkIfRoleIsProfessor(user);
        return this.classService.create(dto);
    }

    @Get()
    public async getAll(@User() user: Account): Promise<Class[]> {
        return this.classService.getAll(user);
    }

    @Get(':id')
    public async getById(@Param('id') id: string): Promise<Class> {
        return this.classService.getById(id);
    }

    @Post(':id')
    public async update(@User() user: Account, @Param('id') id: string, @Body() dto: Partial<ClassDto>): Promise<Class> {
        checkIfRoleIsProfessor(user);
        return this.classService.update(id, dto);
    }

    @Post(':id/student')
    public async addStudent(@User() user: Account, @Param('id') id: string, @Body() studentId: StudentDto): Promise<Class> {
        checkIfRoleIsProfessor(user);
        return this.classService.addStudents(id, studentId.studentId)
    }

    @Delete(':id/student')
    public async removeStudent(@User() user: Account, @Param('id') id: string, @Body() studentId: StudentDto): Promise<Class> {
        checkIfRoleIsProfessor(user);
        return this.classService.removeStudent(id, studentId.studentId);
    }

    @Delete(':id')
    public async deleteClass(@User() user: Account, @Param('id') id: string): Promise<HttpStatus> {
        checkIfRoleIsProfessor(user);
        return this.classService.delete(id);
    }
}
