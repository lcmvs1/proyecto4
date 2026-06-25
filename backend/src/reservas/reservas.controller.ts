import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createReservaDto: any, @Request() req) {
    const userId = req.user.userId;
    return this.reservasService.create(createReservaDto, userId);
  }

  @Get('mis-reservas')
  @UseGuards(JwtAuthGuard)
  findAllByUser(@Request() req) {
    const userId = req.user.userId;
    return this.reservasService.findAllByUser(userId);
  }

  @Get('ocupados/:funcionId')
  getOccupiedSeats(@Param('funcionId') funcionId: string) {
    return this.reservasService.getOccupiedSeats(+funcionId);
  }
}
