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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const typeorm_1 = require("typeorm");
const pelicula_entity_1 = require("../../peliculas/entities/pelicula.entity");
const sala_entity_1 = require("../../salas/entities/sala.entity");
const reserva_entity_1 = require("../../reservas/entities/reserva.entity");
let Funcion = class Funcion {
    id;
    fecha;
    hora;
    precio;
    pelicula;
    sala;
    reservas;
    createdAt;
    updatedAt;
};
exports.Funcion = Funcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Funcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Funcion.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Funcion.prototype, "hora", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Funcion.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pelicula_entity_1.Pelicula, (pelicula) => pelicula.funciones, { onDelete: 'CASCADE' }),
    __metadata("design:type", pelicula_entity_1.Pelicula)
], Funcion.prototype, "pelicula", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sala_entity_1.Sala, (sala) => sala.funciones, { onDelete: 'CASCADE' }),
    __metadata("design:type", sala_entity_1.Sala)
], Funcion.prototype, "sala", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_entity_1.Reserva, (reserva) => reserva.funcion),
    __metadata("design:type", Array)
], Funcion.prototype, "reservas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Funcion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Funcion.prototype, "updatedAt", void 0);
exports.Funcion = Funcion = __decorate([
    (0, typeorm_1.Entity)('funciones')
], Funcion);
//# sourceMappingURL=funcione.entity.js.map