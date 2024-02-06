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

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() cat: Cat) {
    return this.catsService.create(cat);
  }

  @Patch()
  update(@Body() cat: Cat) {
    return this.catsService.update(cat);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.catsService.delete(+id);
  }

  @Get()
  findAll(): any {
    return this.catsService.findAll();
  }

}
