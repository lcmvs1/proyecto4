import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,
  ) { }

  async create(createPeliculaDto: any, file?: Express.Multer.File) {
    const { titulo, sinopsis, genero, duracion, clasificacion } = createPeliculaDto;
    console.log("CLASIFICACION:", clasificacion);

    const imagen_poster = file ? `/uploads/peliculas/${file.filename}` : null;

    const nuevaPelicula = this.peliculaRepo.create({
      titulo,
      sinopsis,
      genero,
      duracion: parseInt(duracion),
      clasificacion,
      imagen_poster: imagen_poster || undefined,
    });

    return await this.peliculaRepo.save(nuevaPelicula);
  }

  async findAll() {
    return await this.peliculaRepo.find();
  }

  async findOne(id: number) {
    const pelicula = await this.peliculaRepo.findOne({
      where: { id },
      relations: { funciones: { sala: true } },
    });
    if (!pelicula) throw new NotFoundException('Película no encontrada');

    // Ordenar las funciones por fecha y hora (TypeORM relation order es más complejo sin QueryBuilder, lo ordenamos en JS)
    if (pelicula.funciones) {
      pelicula.funciones.sort((a, b) => {
        if (a.fecha === b.fecha) {
          return a.hora.localeCompare(b.hora);
        }
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
      });
    }

    return pelicula;
  }

  async update(id: number, updatePeliculaDto: any, file?: Express.Multer.File) {
    const pelicula = await this.findOne(id);
    const { titulo, sinopsis, genero, duracion, clasificacion } = updatePeliculaDto;

    pelicula.titulo = titulo || pelicula.titulo;
    pelicula.sinopsis = sinopsis || pelicula.sinopsis;
    pelicula.genero = genero || pelicula.genero;
    if (duracion) pelicula.duracion = parseInt(duracion);
    pelicula.clasificacion = clasificacion || pelicula.clasificacion;

    if (file) {
      if (pelicula.imagen_poster) {
        // En NestJS la raiz del proyecto es donde esta src o la carpeta del compilado
        const oldImagePath = path.join(process.cwd(), 'public', pelicula.imagen_poster);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      pelicula.imagen_poster = `/uploads/peliculas/${file.filename}`;
    }

    return await this.peliculaRepo.save(pelicula);
  }

  async remove(id: number) {
    const pelicula = await this.findOne(id);
    if (pelicula.imagen_poster) {
      const imagePath = path.join(process.cwd(), 'public', pelicula.imagen_poster);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    return await this.peliculaRepo.remove(pelicula);
  }
}
