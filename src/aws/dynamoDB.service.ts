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

@Injectable()
export class DynamoDBService {
  REGION: string;
  CREDENTIAL_REGION: string;
  IDENTITY_POOL_ID: string;
  ddbDocClient: DynamoDBDocumentClient;

  // 初期化処理で、DynamoDBを使用するためDynamoDBのインスタンス生成
  constructor() {
    this.REGION = process.env.AWS_REGION;
    this.CREDENTIAL_REGION = process.env.CREDENTIAL_REGION;
    this.IDENTITY_POOL_ID = process.env.IDENTITY_POOL_ID || '';

    const ddbClient: DynamoDBClient = new DynamoDBClient({
      region: this.REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: this.CREDENTIAL_REGION,
        },
        identityPoolId: this.IDENTITY_POOL_ID,
      }),
    });

    this.ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
  }

  async putItem(formData: any): Promise<PutCommandOutput> {
    const params: PutCommandInput = {
      TableName: 'myWeightData',
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
      TableName: 'myWeightData',
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
