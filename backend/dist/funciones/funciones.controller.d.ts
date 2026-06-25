import { FuncionesService } from './funciones.service';
export declare class FuncionesController {
    private readonly funcionesService;
    constructor(funcionesService: FuncionesService);
    create(createFuncioneDto: any): Promise<import("./entities/funcione.entity").Funcion>;
    findAll(): Promise<import("./entities/funcione.entity").Funcion[]>;
    findOne(id: string): Promise<import("./entities/funcione.entity").Funcion>;
    update(id: string, updateFuncioneDto: any): Promise<import("./entities/funcione.entity").Funcion>;
    remove(id: string): Promise<import("./entities/funcione.entity").Funcion>;
}
