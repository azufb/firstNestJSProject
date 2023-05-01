import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

// ルーティングを記述する

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  @Get('goodBye')
  getGoodBye(): string {
    // appServiceクラスに記述したgetGoodByeメソッドを実行
    return this.appService.getGoodBye();
  }

  @Post()
  postSomething(@Body() requestBody): string {
    console.log(requestBody.msg);
    return this.appService.postSomething(requestBody.msg);
  }

  @Get()
  getDynamoDBItems(): any {
    return this.appService.getDynamoDBItems();
  }
}
