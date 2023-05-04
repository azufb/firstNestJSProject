import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // @nestjs/configはdotenvに依存。
import { DynamoDBService } from './aws/dynamoDB.service';
import { DynamoDBController } from './aws/dynamoDB.controller';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';

// アプリケーションを構成するメタデータを記述する

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, DynamoDBController, SampleController],
  providers: [AppService, DynamoDBService, SampleService],
})
export class AppModule {}
