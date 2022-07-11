import axios from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import { ResType, UserType } from '../../../types';

export default NextAuth({
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			authorization: {
				params: { scope: 'email,public_profile' },
			},
			userinfo: {
				url: 'https://graph.facebook.com/me',
				// https://developers.facebook.com/docs/graph-api/reference/user/#fields
				params: { fields: 'id,name,email,picture,first_name,last_name' },
				async request({ tokens, client, provider }) {
					return await client.userinfo(tokens.access_token!, {
						// @ts-expect-error
						params: provider.userinfo?.params,
					});
				},
			},

			//@ts-ignore
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name,
					email: profile.email,
					image: profile.picture.data.url,
					first_name: profile.first_name,
					last_name: profile.last_name,
				};
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			// @ts-ignore
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					first_name: profile.given_name,
					last_name: profile.family_name,
				};
			},
		}),

		AppleProvider({
			clientId: process.env.APPLE_ID,
			clientSecret: process.env.APPLE_SECRET,
			authorization: { params: { scope: 'name email' } },
		}),

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

				const {
					data: {
						status,
						// @ts-ignore
						data: { user, token, reason },
					},
				} = await axios.post<ResType<UserType>>(
					`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/login`,
					{
						email,
						password,
					}
				);

				if (reason === 'not_verified') throw new Error('not_verified');

				if (status && user) {
					return {
						...user,
						token,
					};
				} else {
					return null;
				}
			},
		}),
	],

	callbacks: {
		async signIn(signInData) {
			const { account, profile, user } = signInData;

			if (account?.type === 'oauth') {
				const provider = account.provider;
				const accessToken =
					provider === 'apple' ? account.id_token : account.access_token;

				const url = `${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/social/${provider}`;

				try {
					const { data } = await axios.post<ResType<any>>(url, {
						token: accessToken,
					});

					if (!data.status) {
						return `/?oautherror=userNotFound&token=${encodeURIComponent(
							accessToken || ''
						)}&firstname=${encodeURIComponent(
							(user?.first_name as string) || ''
						)}&lastname=${encodeURIComponent(
							(user?.last_name as string) || ''
						)}&email=${encodeURIComponent(
							user?.email || ''
						)}&provider=${provider}`;
					}

					signInData.user.token = data.data.token;

					return true;
				} catch (error) {
					console.log(error);

					return '/?oautherror=oauthInternalError';
				}
			}

			return true;
		},

		async jwt({ token, account, user }) {
			if (account) {
				token.id = user?.id;
				token.authToken = user?.token;
			}

			return token;
		},

		async session({ session, token }) {
			try {
				const { data } = await axios.get(
					`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/me`,
					{
						headers: {
							// @ts-ignore
							Authorization: 'Bearer ' + token.authToken,
						},
					}
				);

				if (!data.status) {
					session.error = true;
				}

				// @ts-ignore
				session.user = data?.data?.user;
				session.authToken = token.authToken as string;

				return session;
			} catch (error) {
				console.log(error);
				session.error = true;
				return session;
			}
		},
	},

	pages: {
		signIn: '/',
		signOut: '/',
		error: '/',
		verifyRequest: '/',
		newUser: '/',
	},

	session: {
		maxAge: 30 * 24 * 60 * 60 * 12,
	},

	cookies: {
		sessionToken: {
			name: 'ng-fitness-session-token',
			options: {
				path: '/',
				httpOnly: false,
				sameSite: 'none',
				secure: true,
			},
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
});
