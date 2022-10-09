import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/app/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    // const user = await this.userRepository.findOne({
    //   where: {
    //     id: createTaskDto.userId,
    //   },
    // });

    // const task = this.taskRepository.create({
    //   ...createTaskDto,
    //   user,
    // });

    return await this.taskRepository.save(createTaskDto);
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    await this.taskRepository.update(id, updateTaskDto);

    const updateTask = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (updateTask) {
      return updateTask;
    }

    throw new HttpException(`id is not exist`, HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return this.taskRepository.delete({
      id,
    });
  }
}
