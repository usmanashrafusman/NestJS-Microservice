import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';


class GetUserDto {
  id: number
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern("GET_USER")
  getUser(user: GetUserDto) {
    return this.appService.getUser(user.id);
  }
}
