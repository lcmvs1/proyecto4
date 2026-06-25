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
exports.Sala = void 0;
const typeorm_1 = require("typeorm");
const funcione_entity_1 = require("../../funciones/entities/funcione.entity");
let Sala = class Sala {
    id;
    nombre;
    filas;
    columnas;
    capacidad_total;
    funciones;
    createdAt;
    updatedAt;
};
exports.Sala = Sala;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sala.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sala.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Sala.prototype, "filas", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Sala.prototype, "columnas", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Sala.prototype, "capacidad_total", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => funcione_entity_1.Funcion, (funcion) => funcion.sala),
    __metadata("design:type", Array)
], Sala.prototype, "funciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sala.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Sala.prototype, "updatedAt", void 0);
exports.Sala = Sala = __decorate([
    (0, typeorm_1.Entity)('salas')
], Sala);
//# sourceMappingURL=sala.entity.js.map