# Telegram Auto-Post Bot

An automated content generation and posting system for Telegram channels using AWS Lambda, OpenAI GPT-4, and various APIs. This project automatically creates and posts content to multiple Telegram channels on a scheduled basis.

## 🚀 Features

- **Automated Content Generation**: Uses OpenAI GPT-4 to generate unique, engaging content
- **Multi-Channel Support**: Posts to multiple Telegram channels with different content types
- **Scheduled Posting**: Automated daily posts using AWS EventBridge (CloudWatch Events)
- **Image Generation**: Creates custom images using DALL-E 3 for visual content
- **News Integration**: Fetches and summarizes latest news from NewsAPI
- **Infrastructure as Code**: Deployed using AWS CDK for easy management

## 📋 Supported Content Types

1. **Cat Blog Channel** - Daily adventures of a cat named Барсик (Barsik) with generated images
2. **News Channel** - Summarized and translated news content from NewsAPI

## 🏗️ Architecture

- **AWS Lambda**: Serverless functions for content generation and posting
- **AWS EventBridge**: Scheduled triggers for daily posts
- **OpenAI API**: Content generation and image creation
- **NewsAPI**: Latest news fetching
- **Telegram Bot API**: Content posting to channels
- **AWS CDK**: Infrastructure deployment and management

## 📦 Prerequisites

- Node.js >= 20.0.0
- AWS CLI configured with appropriate permissions
- AWS CDK CLI installed globally
- OpenAI API key
- Telegram Bot token
- NewsAPI key (for news channel)
- Telegram channel IDs

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd telegram-autopost
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your actual API keys and channel IDs:
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   
   # Telegram Channel IDs
   CAT_BLOG_TELEGRAM_CHANNEL_ID=your_cat_blog_channel_id_here
   NEWS_TELEGRAM_CHANNEL_ID=your_news_channel_id_here
   
   # News API Configuration
   NEWS_API_KEY=your_news_api_key_here
   ```

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Bootstrap CDK** (first time only)
   ```bash
   cdk bootstrap
   ```

3. **Deploy the stack**
   ```bash
   cdk deploy
   ```

## 📅 Scheduling

The system is configured to post content daily at 12:00 PM UTC. You can modify the schedule in `lambda-stack.ts`:

```typescript
const rule = new events.Rule(this, 'DailyCronRule', {
  schedule: events.Schedule.cron({
    minute: '0',     // 0th minute
    hour: '12',      // 12 PM (UTC)
    day: '*',        // Every day
    month: '*',      // Every month
    year: '*'        // Every year
  }),
});
```

## 🔧 Configuration

### Lambda Functions

Currently deployed Lambda functions:
- `handlerCatBarsik` - Cat blog posts with generated images
- `handlerNewsChannel` - News content from NewsAPI

### Environment Variables

All sensitive configuration is stored in environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
- `CAT_BLOG_TELEGRAM_CHANNEL_ID`: Channel ID for cat blog content
- `NEWS_TELEGRAM_CHANNEL_ID`: Channel ID for news content
- `NEWS_API_KEY`: NewsAPI key for news content

## 📁 Project Structure

```
telegram-autopost/
├── bin/
│   └── infrastructure.ts    # CDK app entry point
├── lambda/
│   └── index.ts            # Lambda function handlers
├── service/
│   └── functions.ts        # Business logic for content generation
├── lambda-stack.ts         # CDK stack definition
├── webpack.config.js       # Webpack configuration
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in git)
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🔍 Monitoring

- **CloudWatch Logs**: Each Lambda function logs to CloudWatch
- **CloudWatch Metrics**: Monitor function execution and errors
- **AWS EventBridge**: Track scheduled event execution

## 🛡️ Security

- Environment variables are stored securely in AWS Lambda
- `.env` file is excluded from version control
- IAM roles are configured with minimal required permissions
- API keys are never logged or exposed

## 🐛 Troubleshooting

### Common Issues

1. **Lambda timeout**: Increase timeout in `lambda-stack.ts`
2. **API rate limits**: Check OpenAI and Telegram API limits
3. **Permission errors**: Verify IAM roles and policies
4. **Environment variables**: Ensure all required variables are set

### Debugging

Check CloudWatch logs for each Lambda function:
```bash
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Important Notes

- Keep your `.env` file secure and never commit it to version control
- Monitor your API usage to avoid unexpected costs
- Ensure your Telegram bot has admin permissions in the target channels
- Test thoroughly in a development environment before deploying to production

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review CloudWatch logs
3. Open an issue in the repository # tg-autoposter
