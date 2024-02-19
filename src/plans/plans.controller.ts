import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) {}
    
    @Get()
    async findAll() {
        return this.plansService.findAll();
    }

    @Get(':id')
    async findOne(@Param() id: number) {
        return this.plansService.findOne(id);
    }

    @Post('create')
    async create(@Body() data: any) {
        return this.plansService.create(data);
    }

    @Patch('update/:id')
    async update(@Param('id') id: number,@Body() data: any) {
        return this.plansService.update(id, data);
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number) {
        return this.plansService.remove(id);
    }    
}
