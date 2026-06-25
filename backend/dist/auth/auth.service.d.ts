import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usuarioRepo;
    private readonly jwtService;
    constructor(usuarioRepo: Repository<Usuario>, jwtService: JwtService);
    register(body: any): Promise<{
        message: string;
    }>;
    login(body: any): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nombre: string;
            rol: import("./entities/usuario.entity").RolUsuario;
        };
    }>;
}
