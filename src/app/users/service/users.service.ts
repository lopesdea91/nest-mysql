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
  private relationsUser = { tasks: true };

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: TaskRepository,
  ) {}

  async ExceptionCheckId(id: number): Promise<void> {
    const check = await this.userRepository.count({ where: { id } });

    if (!check) {
      throw new HttpException(`id is not exist`, HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: this.relationsUser,
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    await this.ExceptionCheckId(id);

    return await this.userRepository.findOne({
      where: { id },
      relations: this.relationsUser,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.ExceptionCheckId(id);

    await this.userRepository.update(id, updateUserDto);

    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.ExceptionCheckId(id);

    await this.taskRepository.delete({ userId: id });

    const relete = await this.userRepository.delete({ id });

    return relete.affected === 1;
  }
}
