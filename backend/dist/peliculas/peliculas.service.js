"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeliculasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pelicula_entity_1 = require("./entities/pelicula.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let PeliculasService = class PeliculasService {
    peliculaRepo;
    constructor(peliculaRepo) {
        this.peliculaRepo = peliculaRepo;
    }
    async create(createPeliculaDto, file) {
        const { titulo, sinopsis, genero, duracion, clasificacion } = createPeliculaDto;
        console.log("CLASIFICACION:", clasificacion);
        const imagen_poster = file ? `/uploads/peliculas/${file.filename}` : null;
        const nuevaPelicula = this.peliculaRepo.create({
            titulo,
            sinopsis,
            genero,
            duracion: parseInt(duracion),
            clasificacion,
            imagen_poster: imagen_poster || undefined,
        });
        return await this.peliculaRepo.save(nuevaPelicula);
    }
    async findAll() {
        return await this.peliculaRepo.find();
    }
    async findOne(id) {
        const pelicula = await this.peliculaRepo.findOne({
            where: { id },
            relations: { funciones: { sala: true } },
        });
        if (!pelicula)
            throw new common_1.NotFoundException('Película no encontrada');
        if (pelicula.funciones) {
            pelicula.funciones.sort((a, b) => {
                if (a.fecha === b.fecha) {
                    return a.hora.localeCompare(b.hora);
                }
                return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
        }
        return pelicula;
    }
    async update(id, updatePeliculaDto, file) {
        const pelicula = await this.findOne(id);
        const { titulo, sinopsis, genero, duracion, clasificacion } = updatePeliculaDto;
        pelicula.titulo = titulo || pelicula.titulo;
        pelicula.sinopsis = sinopsis || pelicula.sinopsis;
        pelicula.genero = genero || pelicula.genero;
        if (duracion)
            pelicula.duracion = parseInt(duracion);
        pelicula.clasificacion = clasificacion || pelicula.clasificacion;
        if (file) {
            if (pelicula.imagen_poster) {
                const oldImagePath = path.join(process.cwd(), 'public', pelicula.imagen_poster);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            pelicula.imagen_poster = `/uploads/peliculas/${file.filename}`;
        }
        return await this.peliculaRepo.save(pelicula);
    }
    async remove(id) {
        const pelicula = await this.findOne(id);
        if (pelicula.imagen_poster) {
            const imagePath = path.join(process.cwd(), 'public', pelicula.imagen_poster);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        return await this.peliculaRepo.remove(pelicula);
    }
};
exports.PeliculasService = PeliculasService;
exports.PeliculasService = PeliculasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pelicula_entity_1.Pelicula)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PeliculasService);
//# sourceMappingURL=peliculas.service.js.map