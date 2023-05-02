import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// ルーティングを記述する

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('goodBye')
  getGoodBye(): string {
    // appServiceクラスに記述したgetGoodByeメソッドを実行
    return this.appService.getGoodBye();
  }

  @Post()
  postSomething(@Body() requestBody: any): string {
    console.log(requestBody.msg);
    return this.appService.postSomething(requestBody.msg);
  }
}
