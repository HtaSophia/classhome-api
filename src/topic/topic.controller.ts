import { RolesGuard } from './../auth/guards/roles.guard';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UseRoles } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/account/enum/roles.enum';
import { ObjectIdTransform } from 'src/shared/types/object-id-helper';

@Controller('topic')
@UseGuards(JwtGuard, RolesGuard)
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @UseRoles(Roles.PROFESSOR)
  @Post()
  public async create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @UseRoles(Roles.PROFESSOR)
  @Get()
  public async findAll() {
    return this.topicService.findAll();
  }

  @UseRoles(Roles.PROFESSOR)
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.topicService.findOne(ObjectIdTransform(id));
  }

  @UseRoles(Roles.PROFESSOR)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateTopicDto: Partial<CreateTopicDto>) {
    return this.topicService.update(ObjectIdTransform(id), updateTopicDto);
  }
  
  @UseRoles(Roles.PROFESSOR)
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.topicService.remove(ObjectIdTransform(id));
  }
}
