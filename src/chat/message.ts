import { ObjectId } from "src/shared/types/object-id-helper";

export class Message {
    public message: string;
    public date: Date;
    public owner: ObjectId;

    constructor(owner: ObjectId, message: string) {
        this.message = message;
        this.owner = owner;
        this.date = new Date();
    }
}