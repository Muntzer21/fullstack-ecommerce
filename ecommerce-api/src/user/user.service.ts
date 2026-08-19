import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Injects the DB utility
  ) {}

  // Fetch all users
  async findAll() {
    return this.usersRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  // Fetch a specific user by ID
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateRole(id: number, role: Role) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role;

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    // const existing = this.findOne
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // Create a new user record
  // Create a new user record
  async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.findByEmail(userData.email);

    if (existingUser) {
      throw new BadRequestException('This user already exists');
    }

    const newUser = this.usersRepository.create(userData);

    return this.usersRepository.save(newUser);
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}