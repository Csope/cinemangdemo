/** @type {import('next').NextConfig} */
const path = require('path');
const withVideos = require('next-videos');

const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: [
			'gateway.sugarfitness.hu',
			'localhost',
			'fotexnet-fitness-production.s3.eu-north-1.amazonaws.com',
		],
	},
	
	redirects: async () => [
		{
			source: '/:path*',
			has: [{ type: 'host', value: 'sugarfitness.hu' }],
			destination: 'https://www.sugarfitness.hu/:path*',
			permanent: true,
		},
	],
};

module.exports = withVideos();
