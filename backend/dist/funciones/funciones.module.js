"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const funciones_service_1 = require("./funciones.service");
const funciones_controller_1 = require("./funciones.controller");
const funcione_entity_1 = require("./entities/funcione.entity");
const peliculas_module_1 = require("../peliculas/peliculas.module");
const salas_module_1 = require("../salas/salas.module");
let FuncionesModule = class FuncionesModule {
};
exports.FuncionesModule = FuncionesModule;
exports.FuncionesModule = FuncionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([funcione_entity_1.Funcion]),
            peliculas_module_1.PeliculasModule,
            salas_module_1.SalasModule,
        ],
        controllers: [funciones_controller_1.FuncionesController],
        providers: [funciones_service_1.FuncionesService],
        exports: [typeorm_1.TypeOrmModule]
    })
], FuncionesModule);
//# sourceMappingURL=funciones.module.js.map