import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma.module';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Module({
  imports: [PrismaModule], 
  controllers: [UserController], 
  providers: [UserService,JwtService ,JwtGuard],
  exports: [UserService],
})
export class UserModule {}
