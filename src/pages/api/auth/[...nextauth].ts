import axios from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ResType, UserType } from '../../../types';

export default NextAuth({
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			// @ts-ignore
			async authorize(credentials, req) {
				const email = credentials?.email;
				const password = credentials?.password;

				try {
					const {
						data: {
							status,
							data: { user },
						},
					} = await axios.post<ResType<UserType>>(
						`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/login`,
						{
							email,
							password,
						}
					);

					if (status && user) {
						return user;
					} else {
						return null;
					}
				} catch (error) {
					console.log(error);
					//TODO: handle error
					return null;
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, account, user }) {
			console.log(user);
			if (account) {
				token.user = user;
				token.authToken = 'THIS-IS-MY-TOKEN';
			}

			return token;
		},

		async session({ session, token }) {
			// @ts-ignore
			session.user = { ...token.user };
			session.authToken = token.authToken as string;

			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
});
