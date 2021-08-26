import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class ClassDto {
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(3)
    public name: string;

    @MinLength(3)
    @MaxLength(120)
    public description: string;

    @IsNotEmpty()
    @IsNumber()
    public professor_id: number;
}