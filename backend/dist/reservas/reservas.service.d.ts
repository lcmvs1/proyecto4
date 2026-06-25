import { Repository, DataSource } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
export declare class ReservasService {
    private readonly reservaRepo;
    private readonly dataSource;
    constructor(reservaRepo: Repository<Reserva>, dataSource: DataSource);
    create(createReservaDto: any, userId: number): Promise<any>;
    findAllByUser(userId: number): Promise<Reserva[]>;
    getOccupiedSeats(funcionId: number): Promise<string[]>;
}
