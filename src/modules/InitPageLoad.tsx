import React from 'react';
import ContentLoader from '../common/elements/ContentLoader';
import { useUser } from '../hooks';
import { removeAuthToken, setAuthToken } from '../utils';

const InitPageLoad = ({ children }: any) => {
	const { status, user, data } = useUser();

	console.log(data);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center pt-20 pb-28">
				<ContentLoader />
			</div>
		);
	}

	if (status === 'authenticated' && user && data?.authToken) {
		setAuthToken(data.authToken);
	} else {
		removeAuthToken();
	}

	return children;
};

export default InitPageLoad;
