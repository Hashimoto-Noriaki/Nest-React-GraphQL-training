import { Injectable } from '@nestjs/common';
import { Task as TaskModel } from './models/task.model'; // TaskModelをインポート
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput } from './dto/CreateTask.input';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  // getTasks()メソッドの修正
  async getTasks(): Promise<TaskModel[]> {
    const tasks = await this.prismaService.task.findMany();
    // Prisma の Task 型を GraphQL の TaskModel 型に変換
    return tasks.map((task) => this.mapToTaskModel(task));
  }

  // createTask()メソッドの修正
  async createTask(createTaskInput: CreateTaskInput): Promise<TaskModel> {
    const { name, dueDate, description } = createTaskInput;

    const createdTask = await this.prismaService.task.create({
      data: {
        name,
        dueDate,
        description,
      },
    });

    // Prisma の Task 型を GraphQL の TaskModel 型に変換
    return this.mapToTaskModel(createdTask);
  }

  // Prisma の Task を GraphQL の TaskModel に変換するヘルパーメソッド
  private mapToTaskModel(task: Task): TaskModel {
    return {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate,
      status: task.status,
      description: task.description,
      createdAt: task.createAt, // ここを修正
      updatedAt: task.updateAt, // ここを修正
    };
  }
}
