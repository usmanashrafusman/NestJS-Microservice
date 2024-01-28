import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePayload } from 'src/common/utils';

export enum EVENTS {
    CREATE_USER = "CREATE_USER"
}

@Injectable()
export class UserClientService extends ClientKafka implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        super({
            client: {
                clientId: configService.getOrThrow("KAFKA_CLIENT_ID"),
                brokers: [configService.getOrThrow("KAFKA_BROKER")],
            },
            consumer: {
                groupId: configService.getOrThrow("KAFKA_GROUP_ID")
            },
        });
    }

    onModuleInit(): void {
        Object.keys(EVENTS).forEach((event) => {
            this.subscribeToResponseOf(EVENTS[event])
        })
        this.connect()
    }

    onModuleDestroy(): void {
        this.close()
    }

    async sendMessage(topic: string, payload: object) {
        return new Promise((resolve) => {
            this.send(topic, new CreatePayload(payload)).subscribe((resp) => {
                resolve(resp)
            })
        })
    }
}
