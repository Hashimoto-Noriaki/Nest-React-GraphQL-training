import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInResponse } from './dto/signinResponse';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log('Validating user:', email);  // ここでemailが正しいか確認
    const user = await this.userService.getUser(email);
    if (user) {
      console.log('User found:', user);  // ユーザーが正しく取得されているか
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signIn(user: User): Promise<SignInResponse> {
    const payload: JwtPayload = { email: user.email, sub: user.id };  // JWT用のペイロードを作成
    return { accessToken: this.jwtService.sign(payload), user };  // トークンを生成して返す
  }
}
