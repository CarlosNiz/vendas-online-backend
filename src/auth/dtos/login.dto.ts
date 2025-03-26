import { IsString } from "class-validator";

export class LonginDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}