import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/CreateTask.input';
@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') CreateTaskInput: CreateTaskInput): Task {
    return this.taskService.createTask(CreateTaskInput);
  }
}

// @Args('name') name: string,
//     @Args('dueDate') dueDate: string,
//     @Args('description', { nullable: true }) description: string,
