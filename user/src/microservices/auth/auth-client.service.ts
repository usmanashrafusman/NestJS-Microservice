import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaClient } from 'src/common/kafka/kafka-client';

export enum AUTH_TOPICS {
  CREATE_AUTH_TOKEN = 'CREATE_AUTH_TOKEN',
}

@Injectable()
export class AuthClientService
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
      AUTH_TOPICS,
    );
  }

  createAuthToken(userId: string) {
    return this.sendMessage(AUTH_TOPICS.CREATE_AUTH_TOKEN, { userId });
  }
}
