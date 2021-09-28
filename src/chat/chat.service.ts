import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'src/shared/types/object-id-helper';
import { Message } from './message';
import { Chat, ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  private logger: Logger;

    public get chats(): Model<ChatDocument> {
        return this.chatModel;
    }

    constructor(@InjectModel('Chat') private readonly chatModel: Model<ChatDocument>) {
        this.logger = new Logger(ChatService.name);
    }


  async create(owner: ObjectId, message: string): Promise<Chat> {
    return await this.chats.create( { $push: { message: new Message(owner, message) } })
  }

  async addMessage(chatId: ObjectId, owner: ObjectId, message: string): Promise<Chat> {
    return await this.chats
    .findOneAndUpdate(
        { _id: chatId }, { $push: { messages: new Message(owner, message) } }, { new: true }
      )
  }
}
