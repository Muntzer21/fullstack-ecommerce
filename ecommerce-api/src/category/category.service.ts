import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly i18n : I18nService
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const exists = await this.categoryRepository.findOne({
      where: [
        { nameEn: createCategoryDto.nameEn },
        { nameAr: createCategoryDto.nameAr },
      ],
    });

    if (exists) {
     throw new ConflictException(await this.i18n.t('category.ALREADY_EXISTS'));
    }


    const category = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
     throw new NotFoundException(await this.i18n.t('category.NOT_FOUND'));
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

     if (!category) {
       throw new NotFoundException(await this.i18n.t('category.NOT_FOUND'));
     }


    await this.categoryRepository.remove(category);
  }
}
