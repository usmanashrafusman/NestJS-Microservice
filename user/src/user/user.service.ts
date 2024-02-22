import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthClientService } from 'src/microservices/auth/auth-client.service';
import { BadRequestException } from 'src/common/exceptions/bad-request-exception';
import { ERROR_MESSAGES } from 'src/common/exceptions';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private authClient: AuthClientService,
    private readonly userRepository: UserRepository,
  ) {}

  async isEmailExist(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return Boolean(user);
  }

  async create(createUserDto: CreateUserDto) {
    const isExist = await this.isEmailExist(createUserDto.email);
    if (isExist) {
      throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXIST);
    }
    const newUser = new User(createUserDto);
    const user = await this.userRepository.save(newUser);
    const token = await this.authClient.createAuthToken(user.id);

    return { user, token };
  }
}
