import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../../auth/entities/usuario.entity';
import { Funcion } from '../../funciones/entities/funcione.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  asientos_seleccionados: string[];

  @Column('decimal', { precision: 10, scale: 2 })
  total_pago: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, { onDelete: 'CASCADE' })
  usuario: Usuario;

  @ManyToOne(() => Funcion, (funcion) => funcion.reservas, { onDelete: 'CASCADE' })
  funcion: Funcion;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
