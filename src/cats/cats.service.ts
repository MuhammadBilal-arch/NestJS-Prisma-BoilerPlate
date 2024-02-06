import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './cat.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(cat: Cat) {
    const createdCat = await this.prisma.cat.create({ data: cat });
    return { message: 'cat successfully created', data: createdCat };
  }

  async update(cat: Cat) {
    const updatedCat = await this.prisma.cat.update({
      where: { id: cat.id },
      data: cat,
    });
    return { message: 'cat successfully updated', data: updatedCat };
  }

  async delete(id: number) {
    const deletedCat = await this.prisma.cat.delete({ where: { id } });
    return { message: 'cat successfully deleted', data: deletedCat };
  }

  async findAll(): Promise<{ message: string; data: Cat[] }> {
    const result = await this.prisma.cat.findMany();
    return { message: 'All cats are found', data: result };
  }

  // Implement methods for update and delete operations
}
