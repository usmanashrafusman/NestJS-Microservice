import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaClient } from 'src/common/kafka/kafka-client';

export enum EVENTS {
  CREATE_USER = 'CREATE_USER',
}

@Injectable()
export class UserClientService
  extends KafkaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super(
      {
        client: {
          clientId: configService.getOrThrow('KAFKA_CLIENT_ID'),
          brokers: [configService.getOrThrow('KAFKA_BROKER')],
        },
        consumer: {
          groupId: configService.getOrThrow('KAFKA_GROUP_ID'),
        },
      },
      EVENTS,
    );
  }

  createUser<T>(user: T) {
    return this.sendMessage(EVENTS.CREATE_USER, user);
  }
}
