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
  async getTasks(userId: number): Promise<TaskModel[]> {
    const tasks = await this.prismaService.task.findMany({
      where: { userId },
    });
    // Prisma の Task 型を GraphQL の TaskModel 型に変換
    return tasks.map((task) => this.mapToTaskModel(task));
  }

  // createTask()メソッド
  async createTask(createTaskInput: CreateTaskInput): Promise<TaskModel> {
    const { name, dueDate, description, userId } = createTaskInput;

    const createdTask = await this.prismaService.task.create({
      data: {
        name,
        dueDate,
        description,
        userId,
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

  // deleteTask()メソッド
  async deleteTask(id: number): Promise<TaskModel> {
    // 指定された ID のタスクを削除し、削除されたタスク情報を取得
    const deletedTask = await this.prismaService.task.delete({
      where: { id },
    });

    // 削除したタスク情報を TaskModel 型で返す
    return this.mapToTaskModel(deletedTask);
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
