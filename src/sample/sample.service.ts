import { Injectable } from '@nestjs/common';

// メソッドを記述する

@Injectable()
export class SampleService {
  getSampleHello(): string {
    return 'Hello Sample!';
  }

  getSampleGoodBye(): string {
    return 'Good Bye, Sample!';
  }
}
