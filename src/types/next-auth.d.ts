import NextAuth, { DefaultSession } from 'next-auth';
import { UserType } from '.';
import { JWT } from 'next-auth/jwt';
declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: UserType & DefaultSession['user'];
		authToken?: string;
		error?: string;
	}

	interface User extends UserType {}
}
