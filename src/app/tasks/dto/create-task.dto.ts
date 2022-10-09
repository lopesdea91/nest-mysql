import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  userId: number;
}
