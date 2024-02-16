import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './cat.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}

  async login(data: any) {
    const result = await this.prisma.cat.findFirst({
      where: {
        email: data.email,
        password: data.password,

      },
    });
    if (!result) {
      throw new NotFoundException('Invalid credentials');
    }
    if(result.password !== data.password){
      throw new NotFoundException('Invalid credentials Password not match');
    }
    return { message: 'Login successful', data: result };
  }

  async register(data: any) {
    const exist = await this.prisma.cat.findFirst({
      where: {
        email: data.email,
        password: data.password,
        
      },
    });
    if (exist) {
      throw new NotFoundException('Invalid credentials');
    }
    const result = await this.prisma.cat.create({ data: data });
    return { message: 'Register successful', data: result };
  }
}
