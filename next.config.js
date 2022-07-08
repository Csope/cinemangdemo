/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['gateway.sugarfitness.hu', 'localhost'],
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

module.exports = nextConfig;
