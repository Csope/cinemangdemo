import axios from 'axios';
import { RedirectableProviderType } from 'next-auth/providers';
import { signIn, SignInResponse, signOut, useSession } from 'next-auth/react';
import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import { ResType, UserType } from '../types';
import { RegisterUserType, UpdateUserType } from '../types/UserType';
import { removeAuthToken, setAuthToken } from '../utils';
import useToasts from './useToasts';

interface DoUpdateUserReturnDataType {
	status: boolean;
	message: string;
	errors:
		| {
				field: string;
				message: string;
		  }[]
		| [];
}
interface DoCreateUserReturnDataType {
	status: boolean;
	message: string;
	errors:
		| {
				field: string;
				message: string;
		  }[]
		| [];
}

const useUser = () => {
	const { data, status } = useSession();
	const { notify } = useToasts();
	const { userState, setUserState } = useContext(UserContext);
	const user = data?.user;

	const doSignInCredentials = async (email: string, password: string) => {
		try {
			const response = await signIn<RedirectableProviderType>('credentials', {
				redirect: false,
				password,
				email,
			});

			if (response?.error === 'not_verified') {
				return {
					status: false,
					notVerified: true,
				};
			}

			if (response?.error) throw new Error(response?.error);

			return {
				status: true,
			};
		} catch (error) {
			return {
				status: false,
			};
		}
	};

	const doSignOut = async () => {
		const response = await signOut({ redirect: false });
		notify('SUCCESS', 'Sikeres kijelentkezés');
		return response;
	};

	const doRegister = async (userData: RegisterUserType) => {
		const returnData: DoCreateUserReturnDataType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const { data } = await axios.post<ResType<UserType>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users`,
				userData
			);

			returnData.status = data.status;
			returnData.message = data.message || '';
			// @ts-ignore
			returnData.errors = data.errors || [];

			return returnData;
		} catch (error) {
			console.log(error);

			return returnData;
		}
	};

	const doRegisterSocial = async (
		userData: RegisterUserType & { token: string },
		provider: string
	) => {
		const returnData: DoCreateUserReturnDataType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const { data } = await axios.post<ResType<UserType>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/social/register/${provider}`,
				userData
			);

			returnData.status = data.status;
			returnData.message = data.message || '';
			// @ts-ignore
			returnData.errors = data.errors || [];

			return returnData;
		} catch (error) {
			console.log(error);

			return returnData;
		}
	};

	const doUpdateUserData = async (
		newUserData: UpdateUserType
	): Promise<DoUpdateUserReturnDataType> => {
		const returnData: DoUpdateUserReturnDataType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const { data } = await axios.put<ResType<UserType>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/${user?.id}`,
				newUserData
			);

			returnData.status = data.status;
			returnData.message = data.message || '';
			// @ts-ignore
			returnData.errors = data.errors || [];

			return returnData;
		} catch (error) {
			console.log(error);

			return returnData;
		}
	};

	const doUpdateAvatar = async (iconName: string) => {
		try {
			const { data } = await axios.put<ResType<UserType>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/${user?.id}/avatar`,
				{
					avatar: iconName,
				}
			);
			return data.status;
		} catch (error) {
			return false;
		}
	};

	const doResendVerifyEmail = async (email: string) => {
		try {
			const { data } = await axios.post<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/resend-verify`,
				{
					email,
				}
			);

			return data.status;
		} catch (error) {
			return false;
		}
	};

	const doVerifyEmail = async (hash: string) => {
		try {
			const { data } = await axios.post<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/email-verify/${hash}`
			);

			return {
				status: data.status,
				message: data.message || '',
			};
		} catch (error) {
			return {
				status: false,
				message: 'Belső kiszolgálóhiba, próbáld újra később',
			};
		}
	};

	const doSendLostPassword = async (email: string) => {
		try {
			const { data } = await axios.post<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/forgotten-password`,
				{
					email,
				}
			);

			return {
				status: data.status,
				message: data.message,
			};
		} catch (error) {
			return {
				status: false,
				message: 'Belső kiszolgálóhiba, próbáld újra később',
			};
		}
	};

	const doChangePassword = async (
		password: string,
		pwConfirm: string,
		hash: string
	) => {
		try {
			const { data } = await axios.post<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/reset-password`,
				{
					password,
					password_confirmation: pwConfirm,
					hash,
				}
			);

			return {
				status: data.status,
				message: data.message,
			};
		} catch (error) {
			return {
				status: false,
				message: 'Belső kiszolgálóhiba, próbáld újra később',
			};
		}
	};

	const doDeleteProfile = async () => {
		try {
			if (!user?.id) throw new Error('UserId not found');

			const { data } = await axios.delete<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/${user.id}`
			);

			return {
				status: data.status,
				message: data.message || 'Belső kiszolgálóhiba, próbáld újra később',
			};
		} catch (error) {
			return {
				status: false,
				message: 'Belső kiszolgálóhiba, próbáld újra később',
			};
		}
	};

	return {
		data,
		status,
		user: userState,
		doSignInCredentials,
		doSignOut,
		doUpdateUserData,
		doUpdateAvatar,
		doSetUserState: setUserState,
		doRegister,
		doResendVerifyEmail,
		doSendLostPassword,
		doChangePassword,
		doVerifyEmail,
		doRegisterSocial,
		doDeleteProfile,
	};
};

export default useUser;
