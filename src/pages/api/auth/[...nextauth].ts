import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const email = credentials?.email;
				const password = credentials?.password;

				const user = {
					id: 3,
					authToken: 'adgjenvjkntriuwbnt4uin4un3u943894indjdsnfm',
					name: 'J Smith',
					email: 'balazscsabak93@gmail.com',
				};

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.id = user?.id;
				token.authToken = user?.authToken;
			}

			return token;
		},

		async session({ session, token }) {
			session.user.id = token.id as number;
			session.user.authToken = token.authToken as string;

			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
});
