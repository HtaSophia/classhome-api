import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AssertionError } from "assert";
import { validate } from "class-validator";
import { Model } from "mongoose";
import { ObjectId } from "src/shared/types/object-id-helper";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { ActivityType } from "./enum/activity.types.enum";
import { Activity, ActivityDocument } from "./schema/activity.schema";

@Injectable()
export class ActivityService {
  private logger: Logger;

  public get activities(): Model<ActivityDocument> {
    return this.activityModel;
  }

  constructor(
    @InjectModel("Activity")
    private readonly activityModel: Model<ActivityDocument>
  ) {
    this.logger = new Logger(ActivityService.name);
  }

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    if (createActivityDto.type === ActivityType.EXAM) {
      this.validateActivity(createActivityDto);
    }

    const newActivity = await this.activities.create(createActivityDto);

    return this.activities.findById({ _id: newActivity._id });
  }

  async findOne(id: ObjectId): Promise<Activity> {
    return await this.activities.findById({ _id: id });
  }

  async update(
    id: ObjectId,
    updateActivityDto: Partial<CreateActivityDto>
  ): Promise<Activity> {
    return await this.activities.findOneAndUpdate(
      { _id: id },
      { $set: updateActivityDto },
      { new: true }
    );
  }

  async remove(id: ObjectId): Promise<HttpStatus> {
    const removedActivity = await this.activities
      .findOneAndRemove({ _id: id })
      .exec();

    if (removedActivity) return HttpStatus.OK;

    return HttpStatus.NOT_FOUND;
  }

  private validateActivity(createActivityDto: CreateActivityDto): void {
    if (
      createActivityDto.deliveryDate === null ||
      createActivityDto.value === null
    ) {
      throw new Error("Activity exam requires both value and deliveryDate");
    }
  }
}
