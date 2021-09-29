import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Entity } from "src/shared/types/entity";

@Schema( {timestamps : true} )
export class Topic extends Entity {
    @Prop({required: true})
    public name: string;
}


export type TopicDocument = Topic & Document;

export const TopicSchema = SchemaFactory.createForClass(Topic);
