import { Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity';
export declare class PeliculasService {
    private readonly peliculaRepo;
    constructor(peliculaRepo: Repository<Pelicula>);
    create(createPeliculaDto: any, file?: Express.Multer.File): Promise<Pelicula>;
    findAll(): Promise<Pelicula[]>;
    findOne(id: number): Promise<Pelicula>;
    update(id: number, updatePeliculaDto: any, file?: Express.Multer.File): Promise<Pelicula>;
    remove(id: number): Promise<Pelicula>;
}
