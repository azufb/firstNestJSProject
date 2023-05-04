import { PutCommandOutput, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { DynamoDBService } from './dynamoDB.service';

type AddItemFormDataType = {
  date: string;
  timestamp: number;
  weight: number;
  bmi: number;
};

@Controller()
export class DynamoDBController {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  @Get('getItems')
  getItems(): Promise<ScanCommandOutput> {
    return this.dynamoDBService.scanItems();
  }

  @Post('addItem')
  addItem(@Body() formData: AddItemFormDataType): Promise<PutCommandOutput> {
    return this.dynamoDBService.putItem(formData);
  }
}
