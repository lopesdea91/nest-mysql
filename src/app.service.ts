import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './app/tasks/entities/task.entity';
import { UserEntity } from './app/users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    @InjectRepository(TaskEntity) private taskEntity: Repository<TaskEntity>,
  ) {}

  async seed() {
    const user = this.userEntity.create({
      name: 'cleide',
    });

    const { id } = await this.userEntity.save(user);
    user.id = id;

    [1, 2, 3, 4, 5, 6, 7].forEach((i: number) => {
      this.taskEntity.save({
        description: `task:${i} | user:${user.id}`,
        status: false,
        userId: user.id,
      });
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
