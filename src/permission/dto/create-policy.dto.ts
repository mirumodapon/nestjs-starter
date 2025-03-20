import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { PolicyDto } from './policy.dto';

export class CreatePolicyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PolicyDto)
  policies: PolicyDto[];
}
