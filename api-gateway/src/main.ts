import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(configService.getOrThrow("PORT"));
})()


