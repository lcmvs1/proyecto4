import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FuncionesService } from './funciones.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('funciones')
export class FuncionesController {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFuncioneDto: any) {
    return this.funcionesService.create(createFuncioneDto);
  }

  @Get()
  findAll() {
    return this.funcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateFuncioneDto: any) {
    return this.funcionesService.update(+id, updateFuncioneDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.funcionesService.remove(+id);
  }
}
