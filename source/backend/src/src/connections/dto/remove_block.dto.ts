import { IsNumber, Min } from "class-validator";

export class RemoveBlockDto {
  @IsNumber(
    {},
    {
      message: "User ID must be a number.",
    }
  )
  @Min(0, {
    message: "User ID must be positive.",
  })
  user_id: number;
}
