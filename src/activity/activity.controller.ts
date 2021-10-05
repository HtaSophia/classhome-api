import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ObjectIdPipe } from 'src/pipes/object-id.pipe';
import { ObjectId } from 'src/shared/types/object-id-helper';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get(':id')
  findOne(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.activityService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ObjectIdPipe) id: ObjectId, @Body() updateActivityDto: Partial<CreateActivityDto>) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.activityService.remove(id);
  }
}
