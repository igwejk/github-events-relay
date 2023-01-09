# GitHub Events Relay App

> A GitHub App built with [Probot](https://github.com/probot/probot) that securely
> forwards GitHub webhook events to an HTTP event collector endpoint.

## Setup

### 1. Backing Service Deployment

Follow these steps to deploy `api/GitHubEventsRelayFunction` function on Azure:

1. Set GitHub Actions secrets:
   - `AZURE_CREDENTIALS`

     Required for Azure login. See [Configure deployment credentials](https://github.com/Azure/login#configure-deployment-credentials).

   - `AZURE_FUNCTION_APP_PUBLISH_PROFILE`

     See [Using Publish Profile as Deployment Credential](https://github.com/Azure/functions-action#using-publish-profile-as-deployment-credential-recommended).

1. Execute the `.github/workflows/deploy.yaml` workflow with GitHub Actions

### 2. GitHub App registration

1. Change directory to `api/` folder

   ```bash
   cd api/
   ```

1. Edit `.env` with the following configurations
   - `GHE_HOST`

     Host name of target GitHub service. If the target is `github.com`, then setting
     this configuration value is not necessary.

   - `GH_ORG`

     The organisation to be targeted for the GitHub App registration.

1. A helper tool will guide you with the registration flow. Run the following
   commands to start the tool:

   ```bash
   # Install dependencies
   npm install

   # Run the bot
   npm run probot
   ```

   Then follow the instructions printed on the terminal to conclude the registration.


### 3. GitHub App installation

## 3

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t github-app-forward-events .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> github-app-forward-events
```

## Contributing

If you have suggestions for how github-app-forward-events could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 Igwe Kalu
