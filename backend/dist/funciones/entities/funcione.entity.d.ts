import { Pelicula } from '../../peliculas/entities/pelicula.entity';
import { Sala } from '../../salas/entities/sala.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
export declare class Funcion {
    id: number;
    fecha: string;
    hora: string;
    precio: number;
    pelicula: Pelicula;
    sala: Sala;
    reservas: Reserva[];
    createdAt: Date;
    updatedAt: Date;
}
