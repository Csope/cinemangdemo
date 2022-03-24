import { useContext } from 'react';
import { SiteStatesContext } from '../contexts';

const useSiteStates = () => {
	const {
		siteStates: { showLogin },
		siteStatesDispatch,
	} = useContext(SiteStatesContext);

	const doHideLogin = () => {
		siteStatesDispatch({ type: 'SHOW_LOGIN', payload: false });
	};

	const doShowLogin = () => {
		siteStatesDispatch({ type: 'SHOW_LOGIN', payload: true });
	};

	return {
		siteStatesDispatch,
		doHideLogin,
		doShowLogin,
		showLogin,
	};
};

export default useSiteStates;
