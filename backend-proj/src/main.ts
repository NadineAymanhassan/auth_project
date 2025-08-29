import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  });
  
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API documentation for user authentication')
    .setVersion('1.0')
    .addBearerAuth() // if you're using JWT
    .build();
 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
