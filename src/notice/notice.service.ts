import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId, ObjectIdTransform } from "src/shared/types/object-id-helper";
import { CreateNoticeDto } from "./dto/create-notice.dto";
import { UpdateNoticeDto } from "./dto/update-notice.dto";
import { Notice, NoticeDocument } from "./schema/notice.schema";

@Injectable()
export class NoticeService {
  private logger: Logger;

  public get notices(): Model<NoticeDocument> {
    return this.noticeModel;
  }

  constructor(
    @InjectModel("Notice") private readonly noticeModel: Model<NoticeDocument>
  ) {
    this.logger = new Logger(NoticeService.name);
  }

  public async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    this.logger.log(`Creating notice with type: ${createNoticeDto.owner.toString()} and owner: ${createNoticeDto.owner.toString()}`);
    const { owner, chat, ...rest } = createNoticeDto;

    const newNotice = await this.notices.create({
      owner: ObjectIdTransform(owner),
      chat: ObjectIdTransform(chat),
      ...rest,
    });

    return this.notices.findById(newNotice._id);
  }

  public async findAll(): Promise<Notice[]> {
    this.logger.log(`Retrieving all notices...`);
    return await this.notices.find({});
  }

  public async findById(_id: ObjectId): Promise<Notice> {
    this.logger.log(`Searching for notice with id: ${_id.toString()}`);
    return await this.notices.findById({ _id });
  }

  public async update(_id: ObjectId, updateNoticeDto: UpdateNoticeDto) {
    this.logger.log(`Updating notice with id: ${_id.toString()}`);
    return this.notices.findOneAndUpdate(
      { _id },
      { $set: updateNoticeDto },
      { new: true }
    );
  }

  public async remove(_id: ObjectId): Promise<HttpStatus> {
    const deletedNotice = await this.notices.findOneAndRemove({ _id }).exec();

    if (deletedNotice) {
      this.logger.log(`Deleted notice with ID: ${_id.toString()}`);

      return HttpStatus.OK;
    }

    return HttpStatus.NOT_FOUND;
  }
}
