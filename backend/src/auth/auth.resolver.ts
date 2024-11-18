import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service'; // 正しいインポート
import { SignInInput } from './dto/signIn.input';
import { SignInResponse } from './dto/signInResponse';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  async signIn(
    @Args('signInInput') signInInput: SignInInput, // サインインの入力
  ) {
    // signInInputからメールアドレスとパスワードを取り出してサインイン処理
    const user = await this.authService.validateUser(
      signInInput.email,
      signInInput.password,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return await this.authService.signIn(user); // サインイン処理を実行
  }
}
