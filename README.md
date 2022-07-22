# Assembly Backend API

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i -g serverless` to install serverless globally
- Additionally, we would need our `aws cli` configured - follow [quick guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html) to setup
- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/api/visitors?date=` route with `GET` method. The request body must be provided as `application/json`.

- requesting any other path than `/api/visitors?date=` with any other method than `GET` will result in API Gateway returning a `403` HTTP error code
- A `GET` request to `/api/visitors?date=` with a query param **not** containing a string property named `date` will result in API Gateway returning a `400` HTTP error code
- A `GET` request to `/api/visitors?date=xxx&ignore=` with a query param **not** containing a string property named `ignore` will not result in API Gateway returning a `400` HTTP error code as it is optional
- A `GET` request to `/api/visitors?date=` with a query param containing a string property named `date` will result in API Gateway returning a `200` HTTP status code with a 'attendance' object that is processed by the Lambda. 

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. This can be protected using an authentication method.

### Locally

In order to test the 'attendance' function locally, run the following command:

- `npx sls invoke local -f visitors --path ./path-to-data.json` if you're using NPM

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `date` and `ignore` parameters in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request GET 'https://dukls79rad.execute-api.ap-south-1.amazonaws.com/api/visitors?date=1404198000000&ignore=avila_adobe'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `controller` - containing the handler function that executes when the lambda is trigered
- `api` - containing method that fetches data from the API
- `interfaces` - containing structure that defines the contract in the application
- `service` - containing helper class the parses the data
- `utils` - containing utilities

```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
