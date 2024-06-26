import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

(async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
    },
  );
  await app.listen();
})();
