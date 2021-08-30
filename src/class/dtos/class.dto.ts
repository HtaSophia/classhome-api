import { IsArray, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClassDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    public readonly description: string;

    @IsMongoId()
    @IsNotEmpty()
    public readonly professor: string;

    @IsMongoId({ each: true })
    @IsArray()
    @IsOptional()
    public readonly students: string[];
}
