import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { NoticeType } from "../enum/notice.types.enum";

export class CreateNoticeDto {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    public readonly owner: string;

    @IsNotEmpty()
    public readonly type: NoticeType;

    @IsString()
    public readonly description: string;

    public readonly postedDate: Date = new Date();

    @IsString()
    @IsMongoId()
    public readonly chat: string;
    
}