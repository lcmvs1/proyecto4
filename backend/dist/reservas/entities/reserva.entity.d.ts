import { Usuario } from '../../auth/entities/usuario.entity';
import { Funcion } from '../../funciones/entities/funcione.entity';
export declare class Reserva {
    id: number;
    asientos_seleccionados: string[];
    total_pago: number;
    usuario: Usuario;
    funcion: Funcion;
    createdAt: Date;
    updatedAt: Date;
}
