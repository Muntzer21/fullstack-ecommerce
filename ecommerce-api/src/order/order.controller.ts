import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CurrentUser } from 'src/common/decorators/current-user/current-user.decorator';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // User creates an order
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.orderService.create(user.id, dto);
  }

  // Admin gets all orders
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.orderService.findAll(+page, +limit);
  }

  // Logged-in user gets one order
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  // Logged-in user gets only his orders
  @Get('my/orders')
  @UseGuards(JwtAuthGuard)
  myOrders(@Req() req: AuthRequest) {
    // Later:
    // return this.orderService.myOrders(currentUser.id);
    return this.orderService.myOrders(req.user.id);
  }

  // Admin changes order status
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(+id, updateOrderStatusDto.status);
  }
}
