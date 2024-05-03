import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  links?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
