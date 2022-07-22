import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
	service: 'assembly-backend-api',
	frameworkVersion: '3',
	plugins: ['serverless-esbuild'],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		region: 'ap-south-1',
		profile: 'aws-personal',
		stage: 'api',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			MUSEUM_VISITOR_API:
				'https://data.lacity.org/resource/trxm-jn3c.json',
		},
	},
	// import the function via paths
	functions: {
		visitors: {
			handler: './src/controller/attendance.handler',
			events: [
				{
					http: {
						path: 'visitors',
						method: 'get',
						cors: true,
					},
				},
			],
		},
	},
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;
