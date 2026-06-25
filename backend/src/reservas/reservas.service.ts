import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Funcion } from '../funciones/entities/funcione.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepo: Repository<Reserva>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createReservaDto: any, userId: number) {
    const { funcionId, asientos } = createReservaDto;

    let asientosSeleccionados = Array.isArray(asientos) ? asientos : [asientos];

    if (!asientosSeleccionados || asientosSeleccionados.length === 0) {
      throw new BadRequestException('Debe seleccionar al menos un asiento.');
    }

    let nuevaReserva;

    await this.dataSource.transaction(async (manager) => {
      const funcion = await manager.findOne(Funcion, {
        where: { id: parseInt(funcionId) },
      });

      if (!funcion) throw new NotFoundException('Función no encontrada');

      const reservasExistentes = await manager.find(Reserva, {
        where: { funcion: { id: parseInt(funcionId) } },
      });

      let ocupados: string[] = [];
      reservasExistentes.forEach((r) => {
        if (Array.isArray(r.asientos_seleccionados)) {
          ocupados = ocupados.concat(r.asientos_seleccionados);
        }
      });

      const solapados = asientosSeleccionados.filter((asiento) => ocupados.includes(asiento));
      if (solapados.length > 0) {
        throw new BadRequestException(`Los siguientes asientos ya están ocupados: ${solapados.join(', ')}`);
      }

      const total_pago = funcion.precio * asientosSeleccionados.length;

      nuevaReserva = manager.create(Reserva, {
        asientos_seleccionados: asientosSeleccionados,
        total_pago: total_pago,
        usuario: { id: userId },
        funcion: { id: parseInt(funcionId) },
      });

      await manager.save(nuevaReserva);
    });

    return nuevaReserva;
  }

  async findAllByUser(userId: number) {
    return await this.reservaRepo.find({
      where: { usuario: { id: userId } },
      relations: { funcion: { pelicula: true, sala: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async getOccupiedSeats(funcionId: number) {
    const reservas = await this.reservaRepo.find({
      where: { funcion: { id: funcionId } },
    });

    let asientosOcupados: string[] = [];
    reservas.forEach((r) => {
      if (Array.isArray(r.asientos_seleccionados)) {
        asientosOcupados = asientosOcupados.concat(r.asientos_seleccionados);
      }
    });

    return asientosOcupados;
  }
}
