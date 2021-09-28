import { ObjectId } from '../../shared/types/object-id-helper';
import { NoticeType } from '../enum/notice.types.enum';
import { Entity } from 'src/shared/types/entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps : true })
export class Notice extends Entity{
    @Prop( { type: [{ type: Types.ObjectId, ref: 'Account' }] })
    public owner: ObjectId;

    @Prop()
    public description: string;

    @Prop({required: true})
    public postedDate: Date;
    
    @Prop({required: true})
    public type: NoticeType;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] })
    public chat: ObjectId;

}

export type NoticeDocument = Notice & Document;

export const NoticeSchema = SchemaFactory.createForClass(Notice);