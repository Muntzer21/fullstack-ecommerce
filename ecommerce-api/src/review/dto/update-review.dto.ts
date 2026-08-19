import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
