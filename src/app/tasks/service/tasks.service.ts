import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    console.log('this.taskRepository', this.taskRepository);
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

    return await this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.taskRepository.delete({
      id,
    });
  }
}
