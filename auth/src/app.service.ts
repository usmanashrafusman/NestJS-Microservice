import { Injectable } from '@nestjs/common';

const users = [{ name: "Usman", id: 1 }, { name: "Hello", id: 2 }]

@Injectable()
export class AppService {

  getUser(id: number): typeof users[0] {
    const user = users.find((u) => u.id === id);
    return user
  }

  getHello(): string {
    return 'Hello World!';
  }
}
