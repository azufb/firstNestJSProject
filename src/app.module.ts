import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // @nestjs/configはdotenvに依存。
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';
import { DynamoDBModule } from './aws/dynamoDB.module';

// アプリケーションを構成するメタデータを記述する

@Module({
  imports: [ConfigModule.forRoot(), DynamoDBModule],
  controllers: [AppController, SampleController],
  providers: [AppService, SampleService],
})
export class AppModule {}
