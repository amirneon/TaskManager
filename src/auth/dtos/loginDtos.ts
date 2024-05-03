import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  nickName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
