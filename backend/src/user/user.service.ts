import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10); // パスワードをハッシュ化

    // ハッシュ化されたパスワードを使って新しいユーザーをデータベースに作成
    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // ハッシュ化したパスワードを保存
      },
    });

    return newUser; // 新しく作成されたユーザーを返す
  }
}
