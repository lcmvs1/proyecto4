import { PeliculasService } from './peliculas.service';
export declare class PeliculasController {
    private readonly peliculasService;
    constructor(peliculasService: PeliculasService);
    create(createPeliculaDto: any, file: Express.Multer.File): Promise<import("./entities/pelicula.entity").Pelicula>;
    findAll(): Promise<import("./entities/pelicula.entity").Pelicula[]>;
    findOne(id: string): Promise<import("./entities/pelicula.entity").Pelicula>;
    update(id: string, updatePeliculaDto: any, file: Express.Multer.File): Promise<import("./entities/pelicula.entity").Pelicula>;
    remove(id: string): Promise<import("./entities/pelicula.entity").Pelicula>;
}
