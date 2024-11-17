import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(), // ConfigModuleをセットアップ
    JwtModule.registerAsync({
      imports: [ConfigModule], // ConfigModuleをインポート
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // JWT_SECRETを取得
        signOptions: { expiresIn: '1h' }, // トークンの有効期限を設定
      }),
    }),
    UserModule, // UserModule をインポート
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
