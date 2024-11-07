import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Task as TaskModel } from './models/task.model';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/CreateTask.input';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskModel], { nullable: 'items' })
  async getTasks(): Promise<TaskModel[]> {
    return this.taskService.getTasks();
  }

  @Mutation(() => TaskModel)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskModel> {
    return await this.taskService.createTask(createTaskInput);
  }
}
