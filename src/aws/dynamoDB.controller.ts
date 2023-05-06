import { PutCommandOutput, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddItemFormDataType } from '../types/AddItemFormDataType';
import { DynamoDBService } from './dynamoDB.service';

@Controller('dynamoDB')
export class DynamoDBController {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  @Get('getItems')
  getItems(): Promise<ScanCommandOutput> {
    return this.dynamoDBService.scanItems();
  }

  @Post('addItem')
  addItem(@Body() requestBody: AddItemFormDataType): Promise<PutCommandOutput> {
    return this.dynamoDBService.putItem(requestBody);
  }
}
