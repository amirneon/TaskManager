import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TaskLinkedToUserDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  links?: string;

  @IsString()
  userId: string;
}
