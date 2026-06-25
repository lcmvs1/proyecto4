import { Repository } from 'typeorm';
import { Funcion } from './entities/funcione.entity';
import { Pelicula } from '../peliculas/entities/pelicula.entity';
import { Sala } from '../salas/entities/sala.entity';
export declare class FuncionesService {
    private readonly funcionRepo;
    private readonly peliculaRepo;
    private readonly salaRepo;
    constructor(funcionRepo: Repository<Funcion>, peliculaRepo: Repository<Pelicula>, salaRepo: Repository<Sala>);
    create(createFuncioneDto: any): Promise<Funcion>;
    findAll(): Promise<Funcion[]>;
    findOne(id: number): Promise<Funcion>;
    update(id: number, updateFuncioneDto: any): Promise<Funcion>;
    remove(id: number): Promise<Funcion>;
}
