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
exports.ReservasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reserva_entity_1 = require("./entities/reserva.entity");
const funcione_entity_1 = require("../funciones/entities/funcione.entity");
let ReservasService = class ReservasService {
    reservaRepo;
    dataSource;
    constructor(reservaRepo, dataSource) {
        this.reservaRepo = reservaRepo;
        this.dataSource = dataSource;
    }
    async create(createReservaDto, userId) {
        const { funcionId, asientos } = createReservaDto;
        let asientosSeleccionados = Array.isArray(asientos) ? asientos : [asientos];
        if (!asientosSeleccionados || asientosSeleccionados.length === 0) {
            throw new common_1.BadRequestException('Debe seleccionar al menos un asiento.');
        }
        let nuevaReserva;
        await this.dataSource.transaction(async (manager) => {
            const funcion = await manager.findOne(funcione_entity_1.Funcion, {
                where: { id: parseInt(funcionId) },
            });
            if (!funcion)
                throw new common_1.NotFoundException('Función no encontrada');
            const reservasExistentes = await manager.find(reserva_entity_1.Reserva, {
                where: { funcion: { id: parseInt(funcionId) } },
            });
            let ocupados = [];
            reservasExistentes.forEach((r) => {
                if (Array.isArray(r.asientos_seleccionados)) {
                    ocupados = ocupados.concat(r.asientos_seleccionados);
                }
            });
            const solapados = asientosSeleccionados.filter((asiento) => ocupados.includes(asiento));
            if (solapados.length > 0) {
                throw new common_1.BadRequestException(`Los siguientes asientos ya están ocupados: ${solapados.join(', ')}`);
            }
            const total_pago = funcion.precio * asientosSeleccionados.length;
            nuevaReserva = manager.create(reserva_entity_1.Reserva, {
                asientos_seleccionados: asientosSeleccionados,
                total_pago: total_pago,
                usuario: { id: userId },
                funcion: { id: parseInt(funcionId) },
            });
            await manager.save(nuevaReserva);
        });
        return nuevaReserva;
    }
    async findAllByUser(userId) {
        return await this.reservaRepo.find({
            where: { usuario: { id: userId } },
            relations: { funcion: { pelicula: true, sala: true } },
            order: { createdAt: 'DESC' },
        });
    }
    async getOccupiedSeats(funcionId) {
        const reservas = await this.reservaRepo.find({
            where: { funcion: { id: funcionId } },
        });
        let asientosOcupados = [];
        reservas.forEach((r) => {
            if (Array.isArray(r.asientos_seleccionados)) {
                asientosOcupados = asientosOcupados.concat(r.asientos_seleccionados);
            }
        });
        return asientosOcupados;
    }
};
exports.ReservasService = ReservasService;
exports.ReservasService = ReservasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reserva_entity_1.Reserva)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ReservasService);
//# sourceMappingURL=reservas.service.js.map