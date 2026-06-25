import { SalasService } from './salas.service';
export declare class SalasController {
    private readonly salasService;
    constructor(salasService: SalasService);
    create(createSalaDto: any): Promise<import("./entities/sala.entity").Sala>;
    findAll(): Promise<import("./entities/sala.entity").Sala[]>;
    findOne(id: string): Promise<import("./entities/sala.entity").Sala>;
    update(id: string, updateSalaDto: any): Promise<import("./entities/sala.entity").Sala>;
    remove(id: string): Promise<import("./entities/sala.entity").Sala>;
}
