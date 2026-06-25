import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Funcion } from '../../funciones/entities/funcione.entity';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('int')
  filas: number;

  @Column('int')
  columnas: number;

  @Column('int')
  capacidad_total: number;

  @OneToMany(() => Funcion, (funcion) => funcion.sala)
  funciones: Funcion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
