import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}


  async login(data: any) {
    const user = await this.prisma.cat.findFirst({
      where: {
        email: data.email,
      },
    });
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id }; // sub is a standard JWT claim for subject (identifier)
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful', access_token: token };
  }

  async register(data: any) {
    const exist = await this.prisma.cat.findFirst({
      where: {
        email: data.email,
      },
    });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create the user with the hashed password
    const newUser = await this.prisma.cat.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    // Optionally, you might want to auto-login users after registration
    const payload = { email: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload);

    return { message: 'Registration successful', access_token: token };
  }
}
