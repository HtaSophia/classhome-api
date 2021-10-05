import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { ActivityType } from "../enum/activity.types.enum";

export class CreateActivityDto {
    @IsNotEmpty()
    public readonly type: ActivityType;

    @IsNumber()
    @Max(100)
    @Min(0)
    public readonly value: number;

    @IsMongoId()
    public readonly topic: string;

    @IsMongoId()
    public readonly chat: string;

    public readonly description: string;

    public readonly postedDate: Date = new Date()
    
    public readonly deliveryDate: Date
}
