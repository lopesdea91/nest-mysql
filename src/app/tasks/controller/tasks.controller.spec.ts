import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from '../service/tasks.service';
import { TaskEntity } from '../entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
