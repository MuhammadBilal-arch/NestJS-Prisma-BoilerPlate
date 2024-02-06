import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService, PrismaService],
})
export class AppModule {}
