import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  async create(createSalaDto: any) {
    const { nombre, filas, columnas } = createSalaDto;
    const capacidad_total = parseInt(filas) * parseInt(columnas);

    const nuevaSala = this.salaRepo.create({
      nombre,
      filas: parseInt(filas),
      columnas: parseInt(columnas),
      capacidad_total,
    });

    return await this.salaRepo.save(nuevaSala);
  }

  async findAll() {
    return await this.salaRepo.find();
  }

  async findOne(id: number) {
    const sala = await this.salaRepo.findOneBy({ id });
    if (!sala) throw new NotFoundException('Sala no encontrada');
    return sala;
  }

  async update(id: number, updateSalaDto: any) {
    const sala = await this.findOne(id);
    const { nombre, filas, columnas } = updateSalaDto;

    sala.nombre = nombre || sala.nombre;
    if (filas) sala.filas = parseInt(filas);
    if (columnas) sala.columnas = parseInt(columnas);
    sala.capacidad_total = sala.filas * sala.columnas;

    return await this.salaRepo.save(sala);
  }

  async remove(id: number) {
    const sala = await this.findOne(id);
    return await this.salaRepo.remove(sala);
  }
}
