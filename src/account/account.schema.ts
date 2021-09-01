import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity } from '../shared/types/entity';
import { Roles } from './enum/roles.enum';

@Schema({ timestamps: true })
export class Account extends Entity {
    @Prop({ required: true })
    public username: string;

    @Prop({ required: true, unique: true })
    public email: string;

    @Prop({ required: true, select: false })
    public password: string;

    @Prop({
        type: String,
        enum: Object.values(Roles),
        required: true,
    })
    public role: string;
}

export type AccountDocument = Account & Document;

export const AccountSchema = SchemaFactory.createForClass(Account);
