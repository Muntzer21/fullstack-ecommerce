import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProductDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 12;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
