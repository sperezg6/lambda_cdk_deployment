# Test Lambda CDK Project

A simple Hello World AWS Lambda function written in Python 3.11, deployed using AWS CDK (TypeScript) with automated deployment via GitHub Actions.

## 🚀 Features

- **Python 3.11 Lambda Function**: Simple Hello World handler with logging
- **AWS CDK in TypeScript**: Infrastructure as Code for easy management
- **GitHub Actions**: Automated deployment on push to main branch
- **Local Deployment**: Scripts for easy local testing and deployment
- **Future Ready**: Prepared for API Gateway integration

## 📋 Prerequisites

- **AWS Account** with CLI configured
- **Node.js** 18+ installed
- **Python** 3.11+ installed
- **AWS CDK CLI** (will be installed if missing)
- **GitHub Account** with repository

## 🛠️ Initial Setup

### 1. Clone and Setup

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Make scripts executable
chmod +x setup.sh deploy-local.sh

# Run setup script
./setup.sh
```

The setup script will:
- Check all prerequisites
- Install npm dependencies
- Install AWS CDK CLI if needed
- Bootstrap CDK in your AWS account
- Build the project
- Synthesize the CDK app

### 2. Local Deployment

Deploy the Lambda function from your local machine:

```bash
./deploy-local.sh
```

This script will:
- Build the TypeScript project
- Show you what changes will be deployed
- Ask for confirmation
- Deploy the stack to AWS
- Test the Lambda function
- Display the results

### 3. Manual Testing

After deployment, you can test your Lambda function:

```bash
# Test with default parameters
aws lambda invoke \
  --function-name test-hello-world-lambda \
  --payload '{}' \
  response.json

# Test with custom name
aws lambda invoke \
  --function-name test-hello-world-lambda \
  --payload '{"queryStringParameters": {"name": "Your Name"}}' \
  response.json

# View response
cat response.json | python3 -m json.tool
```

## 🔐 GitHub Actions Setup

### Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

#### Required Secrets:

| Secret Name | How to Get It |
|------------|---------------|
| `AWS_ACCESS_KEY_ID` | Run `aws configure get aws_access_key_id` |
| `AWS_SECRET_ACCESS_KEY` | Run `aws configure get aws_secret_access_key` |
| `AWS_ACCOUNT_ID` | Run `aws sts get-caller-identity --query Account --output text` |

### How to Add Secrets Step-by-Step:

1. **Get your AWS Account ID:**
   ```bash
   aws sts get-caller-identity --query Account --output text
   ```
   Copy this number (12 digits)

2. **Get your AWS Access Key ID:**
   ```bash
   aws configure get aws_access_key_id
   ```
   Copy this value

3. **Get your AWS Secret Access Key:**
   ```bash
   aws configure get aws_secret_access_key
   ```
   Copy this value (keep it secure!)

4. **In GitHub:**
   - For each secret, click "New repository secret"
   - Enter the secret name exactly as shown above
   - Paste the corresponding value
   - Click "Add secret"

### Verify GitHub Actions

After setting up secrets:

1. Make a small change to any file (e.g., update this README)
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Test GitHub Actions deployment"
   git push origin main
   ```
3. Go to the **Actions** tab in your GitHub repository
4. Watch the deployment workflow run
5. Check the logs for any issues

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── bin/
│   └── test-lambda-cdk.ts      # CDK app entry point
├── lib/
│   └── test-lambda-cdk-stack.ts # CDK stack definition
├── lambda/
│   └── hello_world/
│       └── handler.py           # Lambda function code
├── setup.sh                     # Initial setup script
├── deploy-local.sh              # Local deployment script
└── README.md                    # This file
```

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Synthesize CloudFormation template
cdk synth

# Show deployment diff
cdk diff

# Deploy stack
cdk deploy

# Destroy stack (careful!)
cdk destroy

# View Lambda logs
aws logs tail /aws/lambda/test-hello-world-lambda --follow
```

## 🎯 Next Steps

### Add API Gateway (Future)

To add API Gateway to your Lambda:

1. Update `lib/test-lambda-cdk-stack.ts`:
```typescript
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

// Add after Lambda creation
const api = new apigateway.RestApi(this, 'TestHelloWorldApi', {
  restApiName: 'Test Hello World API',
  description: 'API Gateway for Hello World Lambda'
});

const integration = new apigateway.LambdaIntegration(this.lambdaFunction);
api.root.addMethod('GET', integration);
```

2. Redeploy:
```bash
cdk deploy
```

### Add Environment Variables

Update the Lambda configuration in `lib/test-lambda-cdk-stack.ts`:

```typescript
environment: {
  LOG_LEVEL: 'INFO',
  ENVIRONMENT: 'production',
  // Add more variables here
  API_KEY: 'your-api-key',
  DATABASE_URL: 'your-database-url'
}
```

## 🐛 Troubleshooting

### CDK Bootstrap Issues

If you see "This stack uses assets" error:
```bash
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

### Permission Issues

If deployment fails with permission errors:
1. Ensure your AWS CLI is configured correctly
2. Check that your IAM user has necessary permissions
3. Try running with admin credentials temporarily

### GitHub Actions Fails

1. Check that all secrets are set correctly
2. Verify secret names match exactly (case-sensitive)
3. Check the Actions logs for specific errors

### Lambda Not Working

View Lambda logs:
```bash
aws logs tail /aws/lambda/test-hello-world-lambda --follow
```

## 📝 License

This project is for testing purposes.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally using `./deploy-local.sh`
4. Create a pull request to main
5. GitHub Actions will automatically deploy when merged

## 📞 Support

For issues, please create a GitHub issue in this repository.

---

**Remember:** After pushing to main, GitHub Actions will automatically deploy your Lambda function!