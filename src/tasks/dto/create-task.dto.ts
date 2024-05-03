import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  links?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
