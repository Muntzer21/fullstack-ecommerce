import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registers the entity
  providers: [UsersService],
  controllers: [UserController],
  exports:[UsersService]
})
export class UserModule {}
