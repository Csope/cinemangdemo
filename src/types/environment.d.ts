namespace NodeJS {
	interface ProcessEnv extends NodeJS.ProcessEnv {
		NEXT_PUBLIC_API_ROUTE: string;
		NEXT_PUBLIC_USER_SERVICE_ROUTE: string;
		NEXTAUTH_SECRET: string;
		NEXTAUTH_URL: string;
	}
}
