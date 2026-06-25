import { Funcion } from '../../funciones/entities/funcione.entity';
export declare enum Clasificacion {
    MAS_14 = "+14",
    R = "R",
    TODO_PUBLICO = "Todo p\u00FAblico"
}
export declare class Pelicula {
    id: number;
    titulo: string;
    sinopsis: string;
    genero: string;
    duracion: number;
    clasificacion: Clasificacion;
    imagen_poster: string;
    funciones: Funcion[];
    createdAt: Date;
    updatedAt: Date;
}
