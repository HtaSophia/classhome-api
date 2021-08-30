import { IsNotEmpty, IsString } from "class-validator";

export class StudentDto {
    @IsString()
    @IsNotEmpty()
    studentId: string;
}