import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Session } from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';

@Module({
  imports: [TokenModule, TypeOrmModule.forFeature([Session])],
  controllers: [AuthController],
  providers: [SessionRepository, AuthService],
})
export class AuthModule {}
