import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TaskEntity } from '../tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TaskEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
