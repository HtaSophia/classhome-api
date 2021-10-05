import { ObjectId } from '../../shared/types/object-id-helper';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ActivityType } from "../enum/activity.types.enum";
import { Entity } from 'src/shared/types/entity';

@Schema({ timestamps : true })
export class Activity extends Entity{
    @Prop( {type: [{type: Types.ObjectId, ref: 'Chat' }] })
    public chat: ObjectId

    @Prop( {type: [{type: Types.ObjectId, ref: 'Topic' }] })
    public topic: ObjectId

    @Prop( {required: true} )
    public type: ActivityType;

    @Prop()
    public deliveryDate: Date;

    @Prop()
    public postedDate: Date;

    @Prop()
    public description: string

    @Prop()
    public value: Number

}

export type ActivityDocument = Activity & Document;

export const ActivitySchema = SchemaFactory.createForClass(Activity);