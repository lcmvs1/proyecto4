import { ReservasService } from './reservas.service';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    create(createReservaDto: any, req: any): Promise<any>;
    findAllByUser(req: any): Promise<import("./entities/reserva.entity").Reserva[]>;
    getOccupiedSeats(funcionId: string): Promise<string[]>;
}
