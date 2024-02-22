import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

import { DatabaseModule } from 'src/database/database.module';

import { EntityManagerModule } from 'src/database/entity-manager/entity-manager.module';

import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';

import TransactionInterceptor from 'src/common/interceptors/transaction.interceptor';
import { AllExceptionFilter } from 'src/common/exceptions/http.exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    EntityManagerModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
