import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity } from 'src/shared/types/entity';
import { Message } from '../message';

@Schema({ timestamps: true })
export class Chat extends Entity {
    @Prop({ required: true })
    public messages: Message[];
}

export type ChatDocument = Chat & Document;

export const ChatSchema = SchemaFactory.createForClass(Chat);