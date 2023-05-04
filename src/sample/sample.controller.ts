import { Controller, Get } from '@nestjs/common';
import { SampleService } from './sample.service';

// ルーティングを記述する

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  getHello(): string {
    return this.sampleService.getSampleHello();
  }

  @Get('sampleGoodBye')
  getGoodBye(): string {
    return this.sampleService.getSampleGoodBye();
  }
}
