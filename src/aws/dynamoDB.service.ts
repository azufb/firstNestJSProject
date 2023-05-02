import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBService {
  getDynamoDBClient(): DynamoDBDocumentClient {
    const REGION = process.env.AWS_REGION;
    const CREDENTIAL_REGION = process.env.CREDENTIAL_REGION;
    const IDENTITY_POOL_ID = process.env.IDENTITY_POOL_ID || '';

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
  }

  async putItem(formData: any): Promise<any> {
    const ddbDocClient: DynamoDBDocumentClient = this.getDynamoDBClient();

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
      const data: PutCommandOutput = await ddbDocClient.send(
        new PutCommand(params),
      );
      console.log(data);

      return data;
    } catch (err) {
      console.log('err', err);
    }
  }

  async scanItems(): Promise<any> {
    const ddbDocClient: DynamoDBDocumentClient = this.getDynamoDBClient();

    const param = {
      TableName: 'myWeightData',
    };

    try {
      const data: ScanCommandOutput = await ddbDocClient.send(
        new ScanCommand(param),
      );
      console.log(JSON.stringify(data));
      // ここで日付順になるようソートする
      //data.Items?.sort();
      return data;
    } catch (err) {
      console.log('err', err);
    }
  }
}
