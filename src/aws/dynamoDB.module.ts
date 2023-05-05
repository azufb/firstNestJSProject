import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // @nestjs/configはdotenvに依存。
import { DynamoDBController } from './dynamoDB.controller';
import { DynamoDBService } from './dynamoDB.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DynamoDBController],
  providers: [DynamoDBService],
})
export class DynamoDBModule {}
