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

  async ExceptionCheckId(id: number): Promise<void> {
    const check = await this.taskRepository.count({ where: { id } });

    if (!check) {
      throw new HttpException(`id is not exist`, HttpStatus.NOT_FOUND);
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    await this.ExceptionCheckId(id);

    return await this.taskRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    await this.ExceptionCheckId(id);

    await this.taskRepository.update(id, updateTaskDto);

    return await this.taskRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.ExceptionCheckId(id);

    return this.taskRepository.delete({ id });
  }
}
