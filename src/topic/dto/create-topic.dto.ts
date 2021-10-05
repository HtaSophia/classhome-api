import { IsNotEmpty, IsString } from "class-validator";

export class CreateTopicDto {
    @IsNotEmpty()
    @IsString()
    public readonly name: string;
}
