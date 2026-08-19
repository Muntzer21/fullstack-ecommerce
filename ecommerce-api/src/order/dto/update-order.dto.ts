import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/common/enums/order.status';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
