import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.plan.findMany({});
    if (!result) throw new NotFoundException('No plans found');
    return { message: 'Plans list successfully fetched', data: result };
  }

  async findOne(id: number) {
    const result = await this.prisma.plan.findUnique({ where: { id } });
    if (!result) throw new NotFoundException(`Plan with ID ${id} not found`);
    return { message: 'Plan successfully fetched', data: result };
  }
  async create(data: any) {
    console.log(data,"data");
    try {
      const result = await this.prisma.plan.create({ data });
      return { message: 'Plan successfully created', data: result };
    }
    catch (error) {
      console.log(error,"error");
    }
  }

  async update(id: number, data: any) {
    const result = await this.prisma.plan.update({ where: { id }, data });
    return { message: 'Plan successfully updated', data: result };
  }

  async remove(id: number) {
    const result = await this.prisma.plan.delete({ where: { id } });
    return { message: 'Plan successfully deleted', data: result };
  }
}
