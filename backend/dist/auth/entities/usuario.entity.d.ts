import { Reserva } from '../../reservas/entities/reserva.entity';
export declare enum RolUsuario {
    CLIENTE = "cliente",
    ADMIN = "admin"
}
export declare class Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: RolUsuario;
    reservas: Reserva[];
    createdAt: Date;
    updatedAt: Date;
}
