import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: any) {
    const { nombre, email, password } = body;
    const existe = await this.usuarioRepo.findOne({ where: { email } });
    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoUsuario = this.usuarioRepo.create({
      nombre,
      email,
      password: passwordHash,
    });
    
    await this.usuarioRepo.save(nuevoUsuario);
    return { message: 'Usuario registrado exitosamente' };
  }

  async login(body: any) {
    const { email, password } = body;
    const usuario = await this.usuarioRepo.findOne({ where: { email } });
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }
    };
  }
}
