import React, { useEffect } from 'react';
import ContentLoader from '../common/elements/ContentLoader';
import { useUser } from '../hooks';
import { removeAuthToken, setAuthToken } from '../utils';

const InitPageLoad = ({ children }: any) => {
	const { status, user, data, doSetUserState } = useUser();

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center pt-20 pb-28">
				<ContentLoader />
			</div>
		);
	}

	if (status === 'authenticated' && data?.authToken) {
		setAuthToken(data.authToken);
	} else if (status === 'unauthenticated') {
		removeAuthToken();
	}

	return children;
};

export default InitPageLoad;
