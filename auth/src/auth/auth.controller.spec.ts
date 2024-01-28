import { Test, TestingModule } from '@nestjs/testing';
import { AuthContoller } from './auth.controller';
import { AuthService } from './auth.service';

describe('UserController', () => {
  let controller: AuthContoller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthContoller],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthContoller>(AuthContoller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
