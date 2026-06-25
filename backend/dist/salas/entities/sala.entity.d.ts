import { Funcion } from '../../funciones/entities/funcione.entity';
export declare class Sala {
    id: number;
    nombre: string;
    filas: number;
    columnas: number;
    capacidad_total: number;
    funciones: Funcion[];
    createdAt: Date;
    updatedAt: Date;
}
