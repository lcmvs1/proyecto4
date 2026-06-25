import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity';
export declare class SalasService {
    private readonly salaRepo;
    constructor(salaRepo: Repository<Sala>);
    create(createSalaDto: any): Promise<Sala>;
    findAll(): Promise<Sala[]>;
    findOne(id: number): Promise<Sala>;
    update(id: number, updateSalaDto: any): Promise<Sala>;
    remove(id: number): Promise<Sala>;
}
