import axios from 'axios';
import { RedirectableProviderType } from 'next-auth/providers';
import { signIn, SignInResponse, signOut, useSession } from 'next-auth/react';
import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import { ResType, UserType } from '../types';
import { RegisterUserType, UpdateUserType } from '../types/UserType';
import { removeAuthToken, setAuthToken } from '../utils';

interface DoUpdateUserReturnDataType {
	status: boolean;
	message: string;
	errors: object[] | [];
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
	const { userState, setUserState } = useContext(UserContext);
	const user = data?.user;

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

			console.log(data);

			returnData.status = data.status;
			returnData.message = data.message || '';
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
	};
};

export default useUser;
