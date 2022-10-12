import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const where = { id };

    const check = await this.taskRepository.count({ where });

    if (!check) {
      throw new HttpException(`id is not exist`, HttpStatus.NOT_FOUND);
    }

    await this.taskRepository.update(id, updateTaskDto);

    return await this.taskRepository.findOne({ where });
  }

  async remove(id: number) {
    const where = { id };

    const check = await this.taskRepository.count({ where });

    if (!check) {
      throw new HttpException(`id is not exist`, HttpStatus.NOT_FOUND);
    }

    return this.taskRepository.delete({ id });
  }
}
