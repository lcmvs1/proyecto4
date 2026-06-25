import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-jwt-key', // Igual que en AuthModule
    });
  }

  async validate(payload: any) {
    // Este objeto se inyecta en `req.user`
    return { userId: payload.sub, email: payload.email, rol: payload.rol };
  }
}
