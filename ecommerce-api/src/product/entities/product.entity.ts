import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Category } from 'src/category/entities/category.entity';
import { Review } from 'src/review/entities/review.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameEn: string;

  @Column()
  nameAr: string;

  @Column('text')
  descriptionEn: string;

  @Column('text')
  descriptionAr: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    default: 0,
  })
  stock: number;

  @Column({
    nullable: true,
  })
  imageUrl: string;

  @ManyToOne(() => Category, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'categoryId',
  })
  category: Category;

  @OneToMany(() => Review, (rev) => rev.product)
  reviews: Review[];

  @OneToMany(() => OrderItem, (oi) => oi.product)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
