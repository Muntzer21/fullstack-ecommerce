import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
     imports:[TypeOrmModule.forFeature([Order,OrderItem,User,Product]),MailModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
