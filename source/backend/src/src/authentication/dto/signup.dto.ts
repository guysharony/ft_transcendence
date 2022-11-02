import { Match } from "@/common/decorators/match.decorator";
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignUpDto {
  @IsString({
    message: "Username must be a string.",
  })
  @MinLength(4, {
    message: "Username must be longer than or equal to 4 characters.",
  })
  @MaxLength(20, {
    message: "Username must be shorter than or equal to 20 characters.",
  })
  @Matches(/^[A-Za-z0-9_-]+$/i, {
    message: "Username must contain only letters, numbers and underscore.",
  })
  username: string;

  @IsEmail(
    {},
    {
      message: "Email is not valid.",
    }
  )
  email: string;

  @IsString({
    message: "Password must be a string.",
  })
  @MinLength(12, {
    message: "Password must be longer than or equal to 12 characters.",
  })
  @MaxLength(50, {
    message: "Password must be shorter than or equal to 50 characters.",
  })
  @Matches(/(?=.*[a-z]).*$/, {
    message: "Password must contain at least 1 lowercase.",
  })
  @Matches(/(?=.*[A-Z]).*$/, {
    message: "Password must contain at least 1 uppercase.",
  })
  @Matches(/(?=.*\d).*$/, {
    message: "Password must contain at least 1 digit.",
  })
  password: string;

  @IsString({
    message: "Confirm password must be a string.",
  })
  @Match("password", {
    message: "Passwords don't match.",
  })
  confirm_password: string;
}
