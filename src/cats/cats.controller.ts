// cats.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';

@Controller('auth')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('login')
  login(@Body() cat: any) {
    return this.catsService.login(cat);
  }
  @Post('register')
  register(@Body() cat: any) {
    return this.catsService.register(cat);
  }
}
