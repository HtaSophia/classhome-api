import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class ClassDto {
    @IsNumber()
    @IsNotEmpty()
    public readonly professorid: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @MaxLength(120)	
    public readonly description: string;
}