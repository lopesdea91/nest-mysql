import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        tasks: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        tasks: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);

    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.userRepository.delete({
      id,
    });
  }
}
