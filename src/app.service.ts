import { Injectable } from '@nestjs/common';

// メソッドを記述する

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGoodBye(): string {
    return 'Good Bye!';
  }

  postSomething(text: string): string {
    return text;
  }
}
