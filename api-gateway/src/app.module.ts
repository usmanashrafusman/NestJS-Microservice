import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserClientModule } from './microservices/user/user-client.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserClientModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
