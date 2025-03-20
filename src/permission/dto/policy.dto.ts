import { IsString } from 'class-validator';

export class PolicyDto {
  @IsString()
  resource: string;

  @IsString()
  role: string;

  @IsString()
  method: string;
}
