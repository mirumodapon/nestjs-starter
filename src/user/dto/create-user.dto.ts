import { IsEmail, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(64)
  email: string;

  @IsString()
  @MaxLength(64)
  name: string;

  @IsEnum(['USER', 'MANAGER', 'ADMIN', 'SUPER'])
  @IsOptional()
  role: 'USER' | 'MANAGER' | 'ADMIN' | 'SUPER' = 'USER';
}
