import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
