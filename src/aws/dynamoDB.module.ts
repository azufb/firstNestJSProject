import { Module } from '@nestjs/common';
import { DynamoDBController } from './dynamoDB.controller';
import { DynamoDBService } from './dynamoDB.service';

@Module({
  imports: [],
  controllers: [DynamoDBController],
  providers: [DynamoDBService],
})
export class DynamoDBModule {}
