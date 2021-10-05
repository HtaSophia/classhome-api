import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class AddMessageDto {
    
    @IsMongoId()
    @IsNotEmpty()
    public readonly chatId: string;

    @IsMongoId()
    @IsNotEmpty()
    public readonly owner: string;

    @IsString()
    @IsNotEmpty()
    public readonly message: string;

}