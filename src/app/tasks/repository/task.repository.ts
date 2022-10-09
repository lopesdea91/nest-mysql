import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {}
