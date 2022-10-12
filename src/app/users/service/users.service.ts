import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/app/tasks/entities/task.entity';
import { TaskRepository } from 'src/app/tasks/repository/task.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: TaskRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: { tasks: true },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: { tasks: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const where = { id };

    const check = await this.userRepository.count({ where });

    if (!check) {
      throw new HttpException(`id is not exist`, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, updateUserDto);

    return await this.userRepository.findOne({ where });
  }

  async remove(id: number) {
    const where = { id };

    const check = await this.userRepository.count({ where });

    if (!check) {
      throw new HttpException(`id is not exist`, HttpStatus.NOT_FOUND);
    }

    await this.taskRepository.delete({ userId: id });

    return await this.userRepository.delete({ id });
  }
}
