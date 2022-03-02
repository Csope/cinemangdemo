import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** Auth Token from custom backend service */
			authToken: string;

			/** ID of the user */
			id: number;
		} & DefaultSession['user'];
	}
}
