import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isIranPhoneNumber", async: false })
export class IsIranPhoneNumber implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const phoneRegex = /^(?:\+98|0098)?9\d{9}$/;
    return phoneRegex.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return "The phone number must be a valid Iranian phone number.";
  }
}
