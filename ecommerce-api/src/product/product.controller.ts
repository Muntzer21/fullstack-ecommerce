import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { QueryProductDto } from './dto/query-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // @Get()
  // findAll(@Query('page') page = 1, @Query('limit') limit = 6) {
  //   return this.productService.findAll(+page, +limit);
  // }

  @Get('featured')
  findFeatured() {
    return this.productService.findFeatured();
  }
  @Get()
  findAll(@Query() query: QueryProductDto) {
    return this.productService.findAllp(query);
  }

  @Get('related/:categoryId')
  getRelatedProducts(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('exclude') exclude?: number,
    @Query('limit') limit?: number,
  ) {
    return this.productService.getRelatedProducts(
      categoryId,
      Number(exclude),
      Number(limit),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Get('category/:id')
  productsByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findProductsByCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    
    return this.productService.remove(+id);
  }
}
