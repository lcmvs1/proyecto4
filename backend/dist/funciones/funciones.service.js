"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const funcione_entity_1 = require("./entities/funcione.entity");
const pelicula_entity_1 = require("../peliculas/entities/pelicula.entity");
const sala_entity_1 = require("../salas/entities/sala.entity");
let FuncionesService = class FuncionesService {
    funcionRepo;
    peliculaRepo;
    salaRepo;
    constructor(funcionRepo, peliculaRepo, salaRepo) {
        this.funcionRepo = funcionRepo;
        this.peliculaRepo = peliculaRepo;
        this.salaRepo = salaRepo;
    }
    async create(createFuncioneDto) {
        const { PeliculaId, SalaId, fecha, hora, precio } = createFuncioneDto;
        const pelicula = await this.peliculaRepo.findOneBy({ id: parseInt(PeliculaId) });
        if (!pelicula)
            throw new common_1.NotFoundException('Película no encontrada');
        const duracionMinutos = pelicula.duracion;
        const funcionesMismaSala = await this.funcionRepo.find({
            where: {
                sala: { id: parseInt(SalaId) },
                fecha: fecha,
            },
            relations: { pelicula: true },
        });
        const [horas, minutos] = hora.split(':').map(Number);
        const inicioNueva = horas * 60 + minutos;
        const finNueva = inicioNueva + duracionMinutos + 30;
        for (const f of funcionesMismaSala) {
            const [h, m] = f.hora.split(':').map(Number);
            const inicioExistente = h * 60 + m;
            const finExistente = inicioExistente + f.pelicula.duracion + 30;
            if (inicioNueva < finExistente && finNueva > inicioExistente) {
                throw new common_1.BadRequestException('Error: La función se solapa con otra función existente en la misma sala.');
            }
        }
        const nuevaFuncion = this.funcionRepo.create({
            pelicula: { id: parseInt(PeliculaId) },
            sala: { id: parseInt(SalaId) },
            fecha,
            hora,
            precio: parseFloat(precio),
        });
        return await this.funcionRepo.save(nuevaFuncion);
    }
    async findAll() {
        return await this.funcionRepo.find({
            relations: { pelicula: true, sala: true },
            order: { fecha: 'DESC', hora: 'ASC' },
        });
    }
    async findOne(id) {
        const funcion = await this.funcionRepo.findOne({
            where: { id },
            relations: { pelicula: true, sala: true },
        });
        if (!funcion)
            throw new common_1.NotFoundException('Función no encontrada');
        return funcion;
    }
    async update(id, updateFuncioneDto) {
        const { PeliculaId, SalaId, fecha, hora, precio } = updateFuncioneDto;
        const funcion = await this.findOne(id);
        let peliculaToUpdate = funcion.pelicula;
        if (PeliculaId && PeliculaId !== funcion.pelicula.id) {
            const nuevaPeli = await this.peliculaRepo.findOneBy({ id: parseInt(PeliculaId) });
            if (!nuevaPeli)
                throw new common_1.NotFoundException('Película no encontrada');
            peliculaToUpdate = nuevaPeli;
        }
        const funcionesMismaSala = await this.funcionRepo.find({
            where: {
                sala: { id: parseInt(SalaId || funcion.sala.id) },
                fecha: fecha || funcion.fecha,
                id: (0, typeorm_2.Not)(id),
            },
            relations: { pelicula: true },
        });
        const horaEval = hora || funcion.hora;
        const [horas, minutos] = horaEval.split(':').map(Number);
        const inicioNueva = horas * 60 + minutos;
        const finNueva = inicioNueva + peliculaToUpdate.duracion + 30;
        for (const f of funcionesMismaSala) {
            const [h, m] = f.hora.split(':').map(Number);
            const inicioExistente = h * 60 + m;
            const finExistente = inicioExistente + f.pelicula.duracion + 30;
            if (inicioNueva < finExistente && finNueva > inicioExistente) {
                throw new common_1.BadRequestException('Error: La función se solapa con otra función existente en la misma sala.');
            }
        }
        if (PeliculaId)
            funcion.pelicula = peliculaToUpdate;
        if (SalaId)
            funcion.sala = { id: parseInt(SalaId) };
        if (fecha)
            funcion.fecha = fecha;
        if (hora)
            funcion.hora = hora;
        if (precio)
            funcion.precio = parseFloat(precio);
        return await this.funcionRepo.save(funcion);
    }
    async remove(id) {
        const funcion = await this.findOne(id);
        return await this.funcionRepo.remove(funcion);
    }
};
exports.FuncionesService = FuncionesService;
exports.FuncionesService = FuncionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(funcione_entity_1.Funcion)),
    __param(1, (0, typeorm_1.InjectRepository)(pelicula_entity_1.Pelicula)),
    __param(2, (0, typeorm_1.InjectRepository)(sala_entity_1.Sala)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FuncionesService);
//# sourceMappingURL=funciones.service.js.map