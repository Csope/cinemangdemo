import { RedirectableProviderType } from 'next-auth/providers';
import { signIn, SignInResponse, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { removeAuthToken, setAuthToken } from '../utils';

const useUser = () => {
	const { data, status } = useSession();
	const user = data?.user || null;

	const doSignInCredentials = async (email: string, password: string) => {
		try {
			const response = await signIn<RedirectableProviderType>('credentials', {
				redirect: false,
				password,
				email,
			});

			return response;
		} catch (error) {
			return false;
		}
	};

	const doSignOut = async () => {
		const response = await signOut({ redirect: false });

		return response;
	};

	return {
		data,
		status,
		user,
		doSignInCredentials,
		doSignOut,
	};
};

export default useUser;
