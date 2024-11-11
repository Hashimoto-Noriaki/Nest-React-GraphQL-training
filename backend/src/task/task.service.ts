import { Injectable } from '@nestjs/common';
import { Task as TaskModel } from './models/task.model'; // TaskModelをインポート
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput } from './dto/CreateTask.input';
import { UpdateTaskInput } from './dto/updateTask.input';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  // getTasks()メソッド
  async getTasks(): Promise<TaskModel[]> {
    const tasks = await this.prismaService.task.findMany();
    // Prisma の Task 型を GraphQL の TaskModel 型に変換
    return tasks.map((task) => this.mapToTaskModel(task));
  }

  // createTask()メソッド
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

  // updateTask()メソッド
  async updateTask(updateTaskInput: UpdateTaskInput): Promise<TaskModel> {
    // 引数の updateTaskInput を利用してプロパティを参照
    const { id, name, dueDate, status, description } = updateTaskInput;
    const updatedTask = await this.prismaService.task.update({
      data: { name, dueDate, status, description },
      where: { id },
    });

    // Prisma の Task 型を GraphQL の TaskModel 型に変換
    return this.mapToTaskModel(updatedTask);
  }

  // Prisma の Task を GraphQL の TaskModel に変換するヘルパーメソッド
  private mapToTaskModel(task: Task): TaskModel {
    return {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate,
      status: task.status,
      description: task.description,
      createdAt: task.createAt, // 修正箇所: createAt
      updatedAt: task.updateAt, // 修正箇所: updateAt
    };
  }
}
