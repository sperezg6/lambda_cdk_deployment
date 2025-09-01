#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TestLambdaCDKStack } from '../lib/lambda_cdk_deployment-stack';

const app = new cdk.App();

new TestLambdaCDKStack(app, 'TestLambdaCDKStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1'
   },

  // Stack-level tags
  tags: {
    'Project': 'TestLambdaCDK',
    'Environment': 'Production',
    'DeploymentMethod': process.env.GITHUB_ACTIONS ? 'GitHubActions' : 'Local'
  },
  
  description: 'Test Lambda CDK Stack - Hello World Python Lambda'

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

app.synth();