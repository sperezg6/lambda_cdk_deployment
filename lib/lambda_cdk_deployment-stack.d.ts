import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
export declare class TestLambdaCDKStack extends cdk.Stack {
    readonly lambdaFunction: lambda.Function;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}
