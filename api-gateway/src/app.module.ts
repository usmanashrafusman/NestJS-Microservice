import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UserModule } from 'src/user/user.module';
import { UserClientModule } from 'src/microservices/user/user-client.module';
import AllExceptionsFilter from 'src/common/exceptions/AllExceptionsFilter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserClientModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
