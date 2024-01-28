import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';

import { EntityManagerModule } from 'src/entity-manager/entity-manager.module';
import TransactionInterceptor from 'src/common/interceptors/transaction.interceptor';
import AllExceptionsFilter from 'src/common/exceptions/http.exceptions.filter';
import { ConfigModule } from '@nestjs/config';
import { AuthClientModule } from './microservices/auth/auth-client.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AuthClientModule, EntityManagerModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
    AppService
  ],
})
export class AppModule { }
