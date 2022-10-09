import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './service/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
