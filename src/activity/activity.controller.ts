import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectIdTransform } from 'src/shared/types/object-id-helper';
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
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(ObjectIdTransform(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: Partial<CreateActivityDto>) {
    return this.activityService.update(ObjectIdTransform(id), updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(ObjectIdTransform(id));
  }
}
