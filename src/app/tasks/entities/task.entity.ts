import { UserEntity } from 'src/app/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  description: string;

  @Column()
  status: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
