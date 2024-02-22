import { Module, Global } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';

@Global()
@Module({
  providers: [AuthClientService],
  exports: [AuthClientService],
})
export class AuthClientModule {}
