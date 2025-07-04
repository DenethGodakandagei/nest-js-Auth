import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/user.dto';
import {hash} from "bcrypt"

@Injectable()
export class UserService {
    constructor (private prisma:PrismaService){}

   async create(dto: CreateUserDto) {
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (user) throw new ConflictException('Email duplicated');

  const newUser = await this.prisma.user.create({
    data: {
      name: dto.name,
      email: dto.email,
      password: await hash(dto.password, 10),
    },
  });

  const { password, ...result } = newUser;
  return result;
}

async findByEmail(email: string) {
  return await this.prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

async findById(id:number){
    return await this.prisma.user.findUnique({
        where:{
            id:id,
        }
    })
}


}
