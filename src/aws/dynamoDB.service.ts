import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBService {
  REGION: string = process.env.AWS_REGION;
  CREDENTIAL_REGION: string = process.env.CREDENTIAL_REGION;
  IDENTITY_POOL_ID: string = process.env.IDENTITY_POOL_ID || '';

  ddbClient: DynamoDBClient = new DynamoDBClient({
    region: this.REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: {
        region: this.CREDENTIAL_REGION,
      },
      identityPoolId: this.IDENTITY_POOL_ID,
    }),
  });

  ddbDocClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(
    this.ddbClient,
  );

  /*getDynamoDBClient(): DynamoDBDocumentClient {
    const REGION: string = process.env.AWS_REGION;
    const CREDENTIAL_REGION: string = process.env.CREDENTIAL_REGION;
    const IDENTITY_POOL_ID: string = process.env.IDENTITY_POOL_ID || '';

    const ddbClient: DynamoDBClient = new DynamoDBClient({
      region: REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: CREDENTIAL_REGION,
        },
        identityPoolId: IDENTITY_POOL_ID,
      }),
    });

    const ddbDocClient: DynamoDBDocumentClient =
      DynamoDBDocumentClient.from(ddbClient);

    return ddbDocClient;
  }*/

  async putItem(formData: any): Promise<any> {
    const params = {
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
      console.log(data);

      return data;
    } catch (err) {
      console.log('err', err);
    }
  }

  async scanItems(): Promise<any> {
    const param = {
      TableName: 'myWeightData',
    };

    try {
      const data: ScanCommandOutput = await this.ddbDocClient.send(
        new ScanCommand(param),
      );

      console.log(data.Items);
      // ここで日付順になるようソートする
      //data.Items?.sort();
      return data;
    } catch (err) {
      console.log('err', err);
    }
  }
}
