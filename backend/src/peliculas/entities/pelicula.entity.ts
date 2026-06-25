import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Funcion } from '../../funciones/entities/funcione.entity';

export enum Clasificacion {
  MAS_14 = '+14',
  R = 'R',
  TODO_PUBLICO = 'Todo público',
}

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('text')
  sinopsis: string;

  @Column()
  genero: string;

  @Column('int')
  duracion: number;

  @Column({ type: 'enum', enum: Clasificacion })
  clasificacion: Clasificacion;

  @Column({ nullable: true })
  imagen_poster: string;

  @OneToMany(() => Funcion, (funcion) => funcion.pelicula)
  funciones: Funcion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
