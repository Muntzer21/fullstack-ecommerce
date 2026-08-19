// src/users/user.entity.ts
import { Role } from 'src/common/enums/role.enum';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users') // Maps this class to the 'users' table in your DB
export class User {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column() // Standard text column
  name: string;

  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    nullable: true,
  })
  verificationCode: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  verificationExpires: Date;

  @Column({ default: true }) // Column with options
  isActive: boolean;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
  @Column({
    nullable: true,
  })
  avatar: string;

  @OneToMany(() => Review, (rev) => rev.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
