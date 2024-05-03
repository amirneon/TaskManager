import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Validate,
} from "class-validator";
import { IsIranPhoneNumber } from "./phoneNumberValidation";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nickName: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(null, { message: "Invalid phone number" })
  @Validate(IsIranPhoneNumber, { message: "Invalid Iranian phone number" })
  phoneNumber: string;
}
