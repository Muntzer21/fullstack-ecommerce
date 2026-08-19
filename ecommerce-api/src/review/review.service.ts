import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './entities/review.entity';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/user/user.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { I18nService } from 'nestjs-i18n';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    private readonly productService: ProductService,

    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  async create(
    userId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const product = await this.productService.findOne(
      createReviewDto.productId,
    );

    const user = await this.usersService.findOne(userId);

    const exists = await this.reviewRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: createReviewDto.productId },
      },
    });

    if (exists) {
      throw new ConflictException(await this.i18n.t('review.ALREADY_REVIEWED'));
    }

    const review = this.reviewRepository.create({
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
      user,
      product,
    });

    return await this.reviewRepository.save(review);
  }

  async findAll() {
    return this.reviewRepository.find({
      relations: {
        user: true,
        product: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByProduct(productId: number): Promise<Review[]> {
    await this.productService.findOne(productId);

    return await this.reviewRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: {
        user: true,
        product: true,
      },
    });

    if (!review) {
      throw new ForbiddenException(await this.i18n.t('review.CANNOT_UPDATE'));
    }

    return review;
  }

  async update(
    reviewId: number,
    userId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.findOne(reviewId);

    if (review.user.id !== userId) {
      throw new ForbiddenException(await this.i18n.t('review.CANNOT_DELETE'));
    }

    Object.assign(review, updateReviewDto);

    return this.reviewRepository.save(review);
  }

  async remove(reviewId: number, userId: number): Promise<void> {
    const review = await this.findOne(reviewId);

    if (review.user.id !== userId) {
      throw new ForbiddenException("You cannot delete another user's review");
    }

    await this.reviewRepository.remove(review);
  }
}
