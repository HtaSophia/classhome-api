import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Entity } from '../shared/types/entity';
import { ObjectId } from '../shared/types/object-id-helper';

@Schema({ timestamps: true })
export class Class extends Entity {
    @Prop({ required: true })
    public name: string;

    @Prop()
    public description: string;

    @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
    public professor: ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Account' }] })
    public students: ObjectId[];
}

export type ClassDocument = Class & Document;

export const ClassSchema = SchemaFactory.createForClass(Class);
