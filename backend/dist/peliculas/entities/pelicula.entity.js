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
exports.Pelicula = exports.Clasificacion = void 0;
const typeorm_1 = require("typeorm");
const funcione_entity_1 = require("../../funciones/entities/funcione.entity");
var Clasificacion;
(function (Clasificacion) {
    Clasificacion["MAS_14"] = "+14";
    Clasificacion["R"] = "R";
    Clasificacion["TODO_PUBLICO"] = "Todo p\u00FAblico";
})(Clasificacion || (exports.Clasificacion = Clasificacion = {}));
let Pelicula = class Pelicula {
    id;
    titulo;
    sinopsis;
    genero;
    duracion;
    clasificacion;
    imagen_poster;
    funciones;
    createdAt;
    updatedAt;
};
exports.Pelicula = Pelicula;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pelicula.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pelicula.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Pelicula.prototype, "sinopsis", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pelicula.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Pelicula.prototype, "duracion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Clasificacion }),
    __metadata("design:type", String)
], Pelicula.prototype, "clasificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pelicula.prototype, "imagen_poster", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => funcione_entity_1.Funcion, (funcion) => funcion.pelicula),
    __metadata("design:type", Array)
], Pelicula.prototype, "funciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Pelicula.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Pelicula.prototype, "updatedAt", void 0);
exports.Pelicula = Pelicula = __decorate([
    (0, typeorm_1.Entity)('peliculas')
], Pelicula);
//# sourceMappingURL=pelicula.entity.js.map