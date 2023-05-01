import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

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

export { ddbClient };
