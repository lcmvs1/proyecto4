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
exports.SalasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sala_entity_1 = require("./entities/sala.entity");
let SalasService = class SalasService {
    salaRepo;
    constructor(salaRepo) {
        this.salaRepo = salaRepo;
    }
    async create(createSalaDto) {
        const { nombre, filas, columnas } = createSalaDto;
        const capacidad_total = parseInt(filas) * parseInt(columnas);
        const nuevaSala = this.salaRepo.create({
            nombre,
            filas: parseInt(filas),
            columnas: parseInt(columnas),
            capacidad_total,
        });
        return await this.salaRepo.save(nuevaSala);
    }
    async findAll() {
        return await this.salaRepo.find();
    }
    async findOne(id) {
        const sala = await this.salaRepo.findOneBy({ id });
        if (!sala)
            throw new common_1.NotFoundException('Sala no encontrada');
        return sala;
    }
    async update(id, updateSalaDto) {
        const sala = await this.findOne(id);
        const { nombre, filas, columnas } = updateSalaDto;
        sala.nombre = nombre || sala.nombre;
        if (filas)
            sala.filas = parseInt(filas);
        if (columnas)
            sala.columnas = parseInt(columnas);
        sala.capacidad_total = sala.filas * sala.columnas;
        return await this.salaRepo.save(sala);
    }
    async remove(id) {
        const sala = await this.findOne(id);
        return await this.salaRepo.remove(sala);
    }
};
exports.SalasService = SalasService;
exports.SalasService = SalasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sala_entity_1.Sala)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SalasService);
//# sourceMappingURL=salas.service.js.map