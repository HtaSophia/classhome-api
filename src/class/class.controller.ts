import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Account } from '../account/account.schema';
import { User } from '../auth/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ClassDto } from './class.dto';
import { Class } from './class.schema';
import { ClassService } from './class.service';

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
}
