import { ObjectId } from "src/shared/types/object-id-helper";

export interface Message {
    message: string;
    date: Date;
    owner: ObjectId;
}