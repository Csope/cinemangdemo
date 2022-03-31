import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createContext } from 'react';
import { UserType } from '../types';

const UserContext = createContext<{
	userState: UserType | null;
	setUserState: Dispatch<SetStateAction<UserType | null>>;
}>({
	userState: null,
	setUserState: () => null,
});

interface PropTypes {
	children: JSX.Element;
}

const UserProvider = ({ children }: PropTypes): JSX.Element => {
	const { data } = useSession();
	const [userState, setUserState] = useState<UserType | null>(null);

	useEffect(() => {
		if (data) {
			setUserState(data.user);
		} else {
			setUserState(null);
		}
	}, [data]);

	return (
		<UserContext.Provider value={{ userState, setUserState }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
