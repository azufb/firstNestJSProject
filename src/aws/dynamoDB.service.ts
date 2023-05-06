import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { AddItemFormDataType } from '../types/AddItemFormDataType';

@Injectable()
export class DynamoDBService {
  ddbDocClient: DynamoDBDocumentClient;

  // 初期化処理で、DynamoDBを使用するためDynamoDBのインスタンス生成
  constructor() {
    const ddbClient: DynamoDBClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: process.env.CREDENTIAL_REGION,
        },
        identityPoolId: process.env.IDENTITY_POOL_ID,
      }),
    });

    this.ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
  }

  async putItem(formData: AddItemFormDataType): Promise<PutCommandOutput> {
    const params: PutCommandInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: {
        date: formData.date,
        timestamp: formData.timestamp,
        weight: formData.weight,
        bmi: formData.bmi,
      },
    };

    try {
      const data: PutCommandOutput = await this.ddbDocClient.send(
        new PutCommand(params),
      );

      return data;
    } catch (err: unknown) {
      console.log('err', err);
    }
  }

  async scanItems(): Promise<ScanCommandOutput> {
    const param: ScanCommandInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };

    try {
      const data: ScanCommandOutput = await this.ddbDocClient.send(
        new ScanCommand(param),
      );

      // ここで日付順になるようソートする
      data.Items.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      return data;
    } catch (err: unknown) {
      console.log('err', err);
    }
  }
}
