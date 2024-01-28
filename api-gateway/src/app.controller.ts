import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

class GetUserDto {
  id: number
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
}
