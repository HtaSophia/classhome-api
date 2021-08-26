import { Body, Controller, Post } from '@nestjs/common';
import { ClassDto } from './class.dto';
import { Class } from './class.entity';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService){}

    @Post('create')
    public async create(@Body() classDto: ClassDto): Promise<Class> {
        return await this.classService.create(classDto); 
    }
}