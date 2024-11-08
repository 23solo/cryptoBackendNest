import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6) // Updated minimum length to 6
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(6) // Updated minimum length to 6
  @MaxLength(20) // Updated maximum length to 20
  password: string; // Removed additional checks
}
