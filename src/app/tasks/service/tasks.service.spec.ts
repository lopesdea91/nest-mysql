import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TasksService } from './tasks.service';

// https://www.youtube.com/watch?v=NZB0qxICE80
describe('TasksService', () => {
  let taskService: TasksService;
  let taskRepository: Repository<TaskEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {},
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('functions', () => {
    it('create', () => {
      const data: CreateTaskDto = {
        description: 'description teste',
        status: false,
      };

      const result = taskService.create(data);

      expect(result).toBeDefined();
    });
  });
});
