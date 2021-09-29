import { Injectable, Logger, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId, ObjectIdTransform } from "src/shared/types/object-id-helper";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { Topic, TopicDocument } from "./schema/topic.schema";

@Injectable()
export class TopicService {
  private logger: Logger;

  public get topics(): Model<TopicDocument> {
    return this.topicModel;
  }

  constructor(
    @InjectModel("Class") private readonly topicModel: Model<TopicDocument>
  ) {
    this.logger = new Logger(TopicService.name);
  }

  public async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    this.logger.log(`Creating new topic...`);
    return await this.topics.create({ createTopicDto });
  }

  public async findAll(): Promise<Topic[]> {
    return await this.topics.find({});
  }

  public async findOne(_id: ObjectId): Promise<Topic> {
    this.logger.log(`Searching for topic with id: ${_id.toString()}`);
    return await this.topics.findOne({ _id });
  }

  public async update(_id: ObjectId, updateTopicDto: UpdateTopicDto) {
    this.logger.log(`Updating topic with id: ${_id.toString()}`);
    const updatedTopic = await this.topics.findOneAndUpdate(
      { _id },
      { $set: updateTopicDto },
      { new: true }
    );

    return await this.topics.findOne({ _id: updatedTopic._id });
  }

  public async remove(_id: ObjectId): Promise<HttpStatus> {
    this.logger.log(`Removing topic with id: ${_id.toString()}`);
    const deleted = await this.topics.findOneAndDelete({ _id });
    if (deleted) return HttpStatus.OK;
    this.logger.log(`Topic with id: ${_id.toString()} was not found`);
    return HttpStatus.NOT_FOUND;
  }
}
