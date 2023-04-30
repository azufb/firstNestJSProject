import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// エントリーファイル

async function bootstrap() {
  // NestFactory関数でNestアプリケーションのインスタンスを生成
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
