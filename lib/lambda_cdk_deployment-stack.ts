import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TestLambdaCDKStack extends cdk.Stack {
  public readonly lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   // Create Lambda Function
    this.lambdaFunction = new lambda.Function(this, 'HelloWorldFunction', {
      functionName: 'test-hello-world-lambda',
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/hello_world')),
      handler: 'handler.handler',
      timeout: cdk.Duration.seconds(30),
      memorySize: 128,
      environment: {
        LOG_LEVEL: 'INFO',
        STAGE: 'dev'
      },
      description: 'Test Hello World Lambda function deployed with CDK',
      logRetention: logs.RetentionDays.ONE_WEEK
    });

    // Add Tags for better organization
    cdk.Tags.of(this.lambdaFunction).add('Project', 'TestLambdaCDK');
    cdk.Tags.of(this.lambdaFunction).add('Environment', 'DEV');
    cdk.Tags.of(this.lambdaFunction).add('ManagedBy', 'CDK');

  }
}
