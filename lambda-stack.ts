import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const catBarsikLambda = new lambda.Function(this, 'catBarsikLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handlerCatBarsik',
      code: lambda.Code.fromAsset('dist'), // Path to your lambda function code
      timeout: cdk.Duration.seconds(600),
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
        CAT_BLOG_TELEGRAM_CHANNEL_ID: process.env.CAT_BLOG_TELEGRAM_CHANNEL_ID || '',
      },
    });

    const newsChannelLambda = new lambda.Function(this, 'newsChannelLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handlerNewsChannel',
      code: lambda.Code.fromAsset('dist'), // Path to your lambda function code
      timeout: cdk.Duration.seconds(600),
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
        NEWS_TELEGRAM_CHANNEL_ID: process.env.NEWS_TELEGRAM_CHANNEL_ID || '',
        NEWS_API_KEY: process.env.NEWS_API_KEY || '',
      },
    });

    // Allow Lambda function to access external services
    catBarsikLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['sts:AssumeRole'],
      resources: ['*'],
    }));
    newsChannelLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['sts:AssumeRole'],
      resources: ['*'],
    }));

    // Step 1: Create a CloudWatch Event rule for the cron schedule
    const rule = new events.Rule(this, 'DailyCronRule', {
      schedule: events.Schedule.cron({
        minute: '0',     // 0th minute
        hour: '12',      // 12 PM (UTC)
        day: '*',        // Every day
        month: '*',      // Every month
        year: '*'        // Every year
      }),
    });

    // Step 2: Set the Lambda function as the target of the rule
    rule.addTarget(new targets.LambdaFunction(catBarsikLambda));
    rule.addTarget(new targets.LambdaFunction(newsChannelLambda));
  }
}