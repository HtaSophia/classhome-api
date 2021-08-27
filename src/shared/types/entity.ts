import { Types } from 'mongoose';

export class Entity {
    public _id: Types.ObjectId;

    public createdAt: Date;

    public updatedAt: Date;
}
