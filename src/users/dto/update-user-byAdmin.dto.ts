import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Validate,
} from "class-validator";
import { IsIranPhoneNumber } from "./phoneNumberValidation";
export class UpdateUserByAdminDto {
  @IsString()
  @IsOptional()
  nickName: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: "Invalid phone number" })
  @Validate(IsIranPhoneNumber, { message: "Invalid Iranian phone number" })
  phoneNumber?: string;
}
