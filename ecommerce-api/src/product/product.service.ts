import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { I18nService } from 'nestjs-i18n';
import { QueryProductDto } from './dto/query-product.dto';

export class PaginatedResponseDto<T> {
  data: T[] = [];
  page = 1;
  limit = 10;
  total = 0;
  totalPages = 0;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly categoryService: CategoryService,
    private readonly i18n: I18nService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    console.log(await this.i18n.translate('product.ALREADY_EXISTS'));
    console.log(await this.i18n.translate('product.NOT_FOUND'));

    const exists = await this.productRepository.findOne({
      where: {
        nameEn: createProductDto.nameEn,
      },
    });

    if (exists) {
      throw new ConflictException(await this.i18n.t('product.ALREADY_EXISTS'));
    }

    const product = this.productRepository.create({
      ...createProductDto,
      category,
    });

    return await this.productRepository.save(product);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResponseDto<Product>> {
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      relations: {
        category: true,
      },
    });

    return {
      data: products,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findFeatured() {
    const ids = await this.productRepository
      .createQueryBuilder('product')
      .select('product.id')
      .orderBy('RANDOM()')
      .limit(8)
      .getRawMany();

    return this.productRepository.find({
      where: {
        id: In(ids.map((item) => item.product_id)),
      },
      relations: {
        category: true,
      },
    });
  }

  async getRelatedProducts(categoryId: number, exclude?: number, limit = 4) {
   const where: any = {
     category: {
       id: categoryId,
     },
   };

   if (exclude) {
     where.id = Not(exclude);
   }

   return this.productRepository.find({
     where,
     relations: {
       category: true,
     },
     take: limit,
   });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(await this.i18n.t('product.NOT_FOUND'));
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.categoryId) {
      product.category = await this.categoryService.findOne(
        updateProductDto.categoryId,
      );
    }

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }

  async findAllp(query: QueryProductDto) {
    const { page = 1, limit = 12, category, search } = query;

    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    // Filter by category
    if (category) {
      qb.andWhere('product.categoryId = :category', {
        category,
      });
    }

    // Search by English or Arabic name
    if (search) {
      qb.andWhere(
        `(LOWER(product.nameEn) LIKE LOWER(:search)
        OR LOWER(product.nameAr) LIKE LOWER(:search))`,
        {
          search: `%${search}%`,
        },
      );
    }

    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [products, total] = await qb.getManyAndCount();

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findProductsByCategory(categoryId: number): Promise<Product[]> {
    await this.categoryService.findOne(categoryId);

    return await this.productRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: {
        category: true,
      },
    });
  }
}
