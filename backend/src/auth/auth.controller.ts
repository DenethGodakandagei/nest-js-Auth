import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/auth.dto';
import {AuthService} from './auth.service'
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    console.log('Received DTO:', dto);
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

 @Post('refresh')
@UseGuards(RefreshJwtGuard)
async refreshToken(@Request() req) {
  return await this.authService.refreshToken(req.user);
}

}

