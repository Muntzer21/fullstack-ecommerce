import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from 'src/common/enums/order.status';
import { MailService } from 'src/mail/mail.service';
import { I18nService } from 'nestjs-i18n';
export class PaginatedResponseDto<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
    private readonly emailService: MailService,
    private readonly i18n: I18nService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.dataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(User);
      const productRepository = manager.getRepository(Product);
      const orderRepository = manager.getRepository(Order);
      const orderItemRepository = manager.getRepository(OrderItem);

      // 1. Find user
      const user = await userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
       throw new NotFoundException(await this.i18n.t('order.USER_NOT_FOUND'));
      }

      const order = orderRepository.create({
        user,
        totalPrice: 0,
        status: OrderStatus.PENDING,
      });

      await orderRepository.save(order);

      let totalPrice = 0;
      const orderItems: OrderItem[] = [];

      for (const item of createOrderDto.items) {
        const product = await productRepository.findOne({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
         throw new NotFoundException(
           await this.i18n.t('order.PRODUCT_NOT_FOUND', {
             args: {
               id: item.productId,
             },
           }),
         );
        }

        // 4. Check stock
        if (product.stock < item.quantity) {
        throw new BadRequestException(
          await this.i18n.t('order.OUT_OF_STOCK', {
            args: {
              name: product.nameEn,
            },
          }),
        );
        }

        // 5. Calculate subtotal
        const subTotal = Number(product.price) * item.quantity;

        totalPrice += subTotal;

        // 6. Create order item
        const orderItem = orderItemRepository.create({
          order,
          product,
          quantity: item.quantity,
          price: product.price, // Save current price
        });

        orderItems.push(orderItem);

        // 7. Decrease stock
        product.stock -= item.quantity;

        await productRepository.save(product);
      }

      // 8. Save all order items
      await orderItemRepository.save(orderItems);

      // 9. Update total price
      order.totalPrice = totalPrice;

      await orderRepository.save(order);

      // 10. Return complete order
      return (await orderRepository.findOne({
        where: {
          id: order.id,
        },
        relations: {
          user: true,
          items: {
            product: true,
          },
        },
      })) as Order;
    });
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResponseDto<Order>> {
    const skip = (page - 1) * limit;

    const [orders, total] = await this.orderRepository.findAndCount({
      skip,
      take: limit,
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: orders,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(await this.i18n.t('order.ORDER_NOT_FOUND'));
    }

    return order;
  }

  async myOrders(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        items: {
          product: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const orderRepository = manager.getRepository(Order);
      const productRepository = manager.getRepository(Product);

      const order = await orderRepository.findOne({
        where: { id },
        relations: {
          items: {
            product: true,
          },
        },
      });

      if (!order) {
       throw new NotFoundException(await this.i18n.t('order.ORDER_NOT_FOUND'));
      }

      if (order.status === status) {
       throw new BadRequestException(
         await this.i18n.t('order.ALREADY_STATUS', {
           args: {
             status,
           },
         }),
       );
      }

      // Restore stock only when cancelling
      if (status === OrderStatus.CANCELLED) {
        // Prevent cancelling shipped/delivered orders
        if (
          order.status === OrderStatus.SHIPPED ||
          order.status === OrderStatus.DELIVERED
        ) {
         throw new BadRequestException(
           await this.i18n.t('order.CANNOT_CANCEL'),
         );
        }

        for (const item of order.items) {
          item.product.stock += item.quantity;
        }

        await productRepository.save(order.items.map((item) => item.product));
      }

      order.status = status;

      return await orderRepository.save(order);
    });
  }
}
