import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// エントリーファイル

async function bootstrap() {
  // NestFactory関数でNestアプリケーションのインスタンスを生成
  const app = await NestFactory.create(AppModule);
  // CORSを許可
  app.enableCors();
  // ポート番号を引数で指定
  await app.listen(9000);
}
bootstrap();
