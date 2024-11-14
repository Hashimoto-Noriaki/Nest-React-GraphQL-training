// src/user/user.resolver.ts
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/CreateUser.Input';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserModel> {
    // 戻り値の型を UserModel に修正
    return await this.userService.createUser(createUserInput);
  }
}
