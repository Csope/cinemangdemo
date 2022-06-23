import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OAuthUserNotFound from './OAuthUserNotFound';

type ErrorTypes = 'userNotFound' | 'oauthInternalError' | null;

const OAuthHandler = () => {
	const [error, setError] = useState<ErrorTypes>(null);
	const {
		query: { oautherror, firstname, lastname, email, provider, token },
	} = useRouter();

	useEffect(() => {
		if (oautherror === 'userNotFound') {
			console.log('userNotFound');
			setError(oautherror);
		}

		if (oautherror === 'oauthInternalError') {
			console.log('oauthInternalError');
			setError(oautherror);
		}
	}, []);

	if (error === 'oauthInternalError') return null;

	if (error === 'userNotFound')
		return (
			<OAuthUserNotFound
				firstname={firstname}
				lastname={lastname}
				email={email}
				provider={provider}
				token={token}
			/>
		);

	return null;
};

export default OAuthHandler;
