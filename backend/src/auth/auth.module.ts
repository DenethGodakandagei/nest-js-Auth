import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule], 
  controllers: [AuthController], 
  providers: [AuthService,JwtService], 
})
export class AuthModule {}
