import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoticeDocument } from 'src/notice/schema/notice.schema';
import { ObjectId } from 'src/shared/types/object-id-helper';
import { Message } from './message';
import { Chat, ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  private logger: Logger;

    public get chats(): Model<ChatDocument> {
        return this.chatModel;
    }

    public get notices(): Model<NoticeDocument> {
      return this.noticeModel;
  }

    constructor(
      @InjectModel('Chat') private readonly chatModel: Model<ChatDocument>,
      @InjectModel('Notice') private readonly noticeModel: Model<NoticeDocument>
      ) {
        this.logger = new Logger(ChatService.name);
    }

  async create(noticeId: ObjectId, owner: ObjectId, message: string): Promise<Chat> {
    const newMessage = new Message(owner, message);
    const newChat =  await this.chats.create( { $push: { message: newMessage } })
    this.notices.findOneAndUpdate( {_id: noticeId}, { $set: {chat: newChat._id} } )
    return newChat;
  }

  async addMessage(chatId: ObjectId, owner: ObjectId, message: string): Promise<Chat> {
    const newMessage = new Message(owner, message);
    return await this.chats
    .findOneAndUpdate(
        { _id: chatId }, { $push: { messages: newMessage } }, { new: true }
      )
  }
}
