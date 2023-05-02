import { Body, Controller, Get, Post } from '@nestjs/common';
import { DynamoDBService } from './dynamoDB.service';

@Controller()
export class DynamoDBController {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  @Get('getItems')
  getItems(): any {
    return this.dynamoDBService.scanItems();
  }

  @Post('addItem')
  addItem(@Body() formData: any): any {
    return this.dynamoDBService.putItem(formData);
  }
}
