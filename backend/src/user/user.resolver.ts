import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/CreateUser.Input';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { GetUserArgs } from './dto/getUser.args'; // 追加

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserModel> {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => UserModel, { nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<UserModel> {
    return await this.userService.getUser(getUserArgs.email);
  }
}
