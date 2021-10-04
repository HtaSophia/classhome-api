import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "src/shared/types/object-id-helper";


export class CreateChatDto {
    @IsMongoId()
    public readonly  owner: string;
    
    @IsMongoId()
    public readonly noticeId: string;
    
    @IsNotEmpty()
    @IsString()
    public readonly message: string;

}