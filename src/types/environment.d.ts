namespace NodeJS {
	interface ProcessEnv extends NodeJS.ProcessEnv {
		NEXT_PUBLIC_API_ROUTE: string;
		NEXT_PUBLIC_USER_SERVICE_ROUTE: string;
		NEXT_PUBLIC_ORDER_SERVICE_ROUTE: string;
		NEXT_PUBLIC_ASSETS_ROUTE: string;
		NEXT_PUBLIC_BASE_URL: string;
		NEXT_PUBLIC_GOOGLE_API_KEY: string;
		NEXTAUTH_SECRET: string;
		NEXTAUTH_URL: string;
		FACEBOOK_CLIENT_ID: string;
		FACEBOOK_CLIENT_SECRET: string;
	}
}
