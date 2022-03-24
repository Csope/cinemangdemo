import React from 'react';
import { useReducer, createContext } from 'react';
import { SiteStatesTypes, SiteStatesActions } from '../types/SiteStateTypes';

const initState: SiteStatesTypes = {
	showLogin: false,
};

const SiteStatesContext = createContext<{
	siteStates: SiteStatesTypes;
	siteStatesDispatch: React.Dispatch<SiteStatesActions>;
}>({ siteStates: initState, siteStatesDispatch: () => null });

const SiteStatesReducer = (
	state: SiteStatesTypes,
	action: SiteStatesActions
): SiteStatesTypes => {
	switch (action.type) {
		case 'SHOW_LOGIN':
			return { ...state, showLogin: action.payload };

		default:
			return state;
	}
};

interface PropTypes {
	children: JSX.Element;
}

const SiteStatesProvider = ({ children }: PropTypes): JSX.Element => {
	const [siteStates, siteStatesDispatch] = useReducer(
		SiteStatesReducer,
		initState
	);

	return (
		<SiteStatesContext.Provider value={{ siteStates, siteStatesDispatch }}>
			{children}
		</SiteStatesContext.Provider>
	);
};

export { SiteStatesContext, SiteStatesProvider };
