import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/solid';
import LoginSection from '../../common/site/LoginSection';
import { useSession } from 'next-auth/react';
import { useUser } from '../../hooks';

const HeaderUser = (): JSX.Element => {
	const [showLogin, setShowLogin] = useState(false);
	const { data: session, status } = useSession();
	const { doSignOut } = useUser();

	const toggleLogin = () => {
		if (status === 'loading') return;

		if (status === 'unauthenticated') {
			setShowLogin(true);
		}
	};

	const doLogout = async () => {
		const attempt = await doSignOut();
		console.log(attempt);
	};

	return (
		<>
			<div
				onClick={toggleLogin}
				className="cursor-pointer inline-block border-2 rounded-full p-3 bg-gray-300 text-gray-500 border-gray-500"
			>
				<UserIcon className="w-4 h-4 md:w-8 md:h-8" />
			</div>
			<LoginSection
				showLogin={showLogin}
				hideLogin={() => setShowLogin(false)}
			/>
			{status === 'authenticated' && (
				<div onClick={doLogout}>
					<button>LOGOUT</button>
				</div>
			)}
		</>
	);
};

export default HeaderUser;
