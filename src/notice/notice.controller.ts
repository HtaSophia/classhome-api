import { ObjectIdTransform } from 'src/shared/types/object-id-helper';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('notice')
@UseGuards(JwtGuard)
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  public async create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeService.create(createNoticeDto);
  }

  @Get()
  public async findAll() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.noticeService.findById(ObjectIdTransform(id));
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateNoticeDto: Partial<CreateNoticeDto>) {
    return this.noticeService.update(ObjectIdTransform(id), updateNoticeDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.noticeService.remove(ObjectIdTransform(id));
  }
}
