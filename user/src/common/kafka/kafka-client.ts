import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { CreatePayload } from 'src/common/utils';

interface IClientKafkaOptions {
  client: {
    clientId: string;
    brokers: string[];
  };
  consumer: {
    groupId: string;
  };
}

@Injectable()
export class KafkaClient
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    config: IClientKafkaOptions,
    public topics: any,
  ) {
    super(config);
  }

  onModuleInit(): void {
    Object.keys(this.topics).forEach((event) => {
      this.subscribeToResponseOf(this.topics[event]);
    });
    this.connect();
  }

  onModuleDestroy(): void {
    this.close();
  }

  async sendMessage<T>(topic: string, payload: T) {
    return new Promise((resolve, reject) => {
      this.send(topic, new CreatePayload(payload)).subscribe({
        next: (data) => {
          resolve(data);
        },
        error(err) {
          console.log(err , "IN USER SERVICE");
          reject(err);
        },
      });
    });
  }
}
