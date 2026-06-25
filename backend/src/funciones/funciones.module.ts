import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionesService } from './funciones.service';
import { FuncionesController } from './funciones.controller';
import { Funcion } from './entities/funcione.entity';
import { PeliculasModule } from '../peliculas/peliculas.module';
import { SalasModule } from '../salas/salas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcion]),
    PeliculasModule,
    SalasModule,
  ],
  controllers: [FuncionesController],
  providers: [FuncionesService],
  exports: [TypeOrmModule]
})
export class FuncionesModule {}
