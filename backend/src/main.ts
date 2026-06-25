import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Habilitar CORS para React
  app.enableCors();

  // Servir imágenes estáticas
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3001);
  console.log('🚀 Backend NestJS corriendo en http://localhost:3001');
}
bootstrap();
