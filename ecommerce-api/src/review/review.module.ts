import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[ TypeOrmModule.forFeature([Review]),JwtModule,ProductModule,UserModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
