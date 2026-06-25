import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Funcion } from './entities/funcione.entity';
import { Pelicula } from '../peliculas/entities/pelicula.entity';
import { Sala } from '../salas/entities/sala.entity';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion)
    private readonly funcionRepo: Repository<Funcion>,
    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  async create(createFuncioneDto: any) {
    const { PeliculaId, SalaId, fecha, hora, precio } = createFuncioneDto;

    const pelicula = await this.peliculaRepo.findOneBy({ id: parseInt(PeliculaId) });
    if (!pelicula) throw new NotFoundException('Película no encontrada');

    const duracionMinutos = pelicula.duracion;

    const funcionesMismaSala = await this.funcionRepo.find({
      where: {
        sala: { id: parseInt(SalaId) },
        fecha: fecha,
      },
      relations: { pelicula: true },
    });

    const [horas, minutos] = hora.split(':').map(Number);
    const inicioNueva = horas * 60 + minutos;
    const finNueva = inicioNueva + duracionMinutos + 30; // 30 min limpieza

    for (const f of funcionesMismaSala) {
      const [h, m] = f.hora.split(':').map(Number);
      const inicioExistente = h * 60 + m;
      const finExistente = inicioExistente + f.pelicula.duracion + 30;

      if (inicioNueva < finExistente && finNueva > inicioExistente) {
        throw new BadRequestException('Error: La función se solapa con otra función existente en la misma sala.');
      }
    }

    const nuevaFuncion = this.funcionRepo.create({
      pelicula: { id: parseInt(PeliculaId) },
      sala: { id: parseInt(SalaId) },
      fecha,
      hora,
      precio: parseFloat(precio),
    });

    return await this.funcionRepo.save(nuevaFuncion);
  }

  async findAll() {
    return await this.funcionRepo.find({
      relations: { pelicula: true, sala: true },
      order: { fecha: 'DESC', hora: 'ASC' },
    });
  }

  async findOne(id: number) {
    const funcion = await this.funcionRepo.findOne({
      where: { id },
      relations: { pelicula: true, sala: true },
    });
    if (!funcion) throw new NotFoundException('Función no encontrada');
    return funcion;
  }

  async update(id: number, updateFuncioneDto: any) {
    const { PeliculaId, SalaId, fecha, hora, precio } = updateFuncioneDto;

    const funcion = await this.findOne(id);
    
    let peliculaToUpdate = funcion.pelicula;
    if (PeliculaId && PeliculaId !== funcion.pelicula.id) {
        const nuevaPeli = await this.peliculaRepo.findOneBy({ id: parseInt(PeliculaId) });
        if (!nuevaPeli) throw new NotFoundException('Película no encontrada');
        peliculaToUpdate = nuevaPeli;
    }

    const funcionesMismaSala = await this.funcionRepo.find({
      where: {
        sala: { id: parseInt(SalaId || funcion.sala.id) },
        fecha: fecha || funcion.fecha,
        id: Not(id),
      },
      relations: { pelicula: true },
    });

    const horaEval = hora || funcion.hora;
    const [horas, minutos] = horaEval.split(':').map(Number);
    const inicioNueva = horas * 60 + minutos;
    const finNueva = inicioNueva + peliculaToUpdate.duracion + 30;

    for (const f of funcionesMismaSala) {
      const [h, m] = f.hora.split(':').map(Number);
      const inicioExistente = h * 60 + m;
      const finExistente = inicioExistente + f.pelicula.duracion + 30;

      if (inicioNueva < finExistente && finNueva > inicioExistente) {
        throw new BadRequestException('Error: La función se solapa con otra función existente en la misma sala.');
      }
    }

    if (PeliculaId) funcion.pelicula = peliculaToUpdate;
    if (SalaId) funcion.sala = { id: parseInt(SalaId) } as Sala;
    if (fecha) funcion.fecha = fecha;
    if (hora) funcion.hora = hora;
    if (precio) funcion.precio = parseFloat(precio);

    return await this.funcionRepo.save(funcion);
  }

  async remove(id: number) {
    const funcion = await this.findOne(id);
    return await this.funcionRepo.remove(funcion);
  }
}
