import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput } from './dto/CreateTask.input';

@Injectable()
export class TaskService {
  tasks: Task[] = [];
  constructor(private readonly prismaService: PrismaService){} //Prisamサービスを使用できるようにする

  getTasks(): Task[] {
    return this.prismaService.task.findMany();
  }

  createTask(createTaskInput: CreateTaskInput): Task {
    const { name, dueDate, description } = createTaskInput;
    
  }
}
