import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SalasService } from './salas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSalaDto: any) {
    return this.salasService.create(createSalaDto);
  }

  @Get()
  findAll() {
    return this.salasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salasService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateSalaDto: any) {
    return this.salasService.update(+id, updateSalaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.salasService.remove(+id);
  }
}
