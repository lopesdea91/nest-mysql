import { Module } from '@nestjs/common';
import { TasksModule } from './app/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TaskEntity } from './app/tasks/entities/task.entity';
import { UserEntity } from './app/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: 'nest',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TasksModule,
    UsersModule,
    TypeOrmModule.forFeature([TaskEntity, UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
