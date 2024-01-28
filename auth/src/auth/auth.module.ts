import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthContoller } from './auth.controller';
import { Session } from './entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  controllers: [AuthContoller],
  providers: [AuthService],
})
export class AuthModule { }
