import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Pelicula } from '../../peliculas/entities/pelicula.entity';
import { Sala } from '../../salas/entities/sala.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('funciones')
export class Funcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(() => Pelicula, (pelicula) => pelicula.funciones, { onDelete: 'CASCADE' })
  pelicula: Pelicula;

  @ManyToOne(() => Sala, (sala) => sala.funciones, { onDelete: 'CASCADE' })
  sala: Sala;

  @OneToMany(() => Reserva, (reserva) => reserva.funcion)
  reservas: Reserva[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
