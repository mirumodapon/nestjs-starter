import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListUserDto {
  @Type(() => Number)
  @IsInt()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 50;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => `%${value.replaceAll('%', '\\%')}%`)
  search: string;
}
