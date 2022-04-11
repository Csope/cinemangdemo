import React from 'react';
import { useReducer, createContext } from 'react';
import { SiteStatesTypes, SiteStatesActions } from '../types/SiteStateTypes';

const initState: SiteStatesTypes = {
	showLogin: false,
	showLostPassword: false,
	selectedPass: null,
	reservationPurchaseInProgress: false,
	passPurchaseInProgress: false,
	showCareerForm: false,
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

		case 'SET_SELECTED_PASS':
			return { ...state, selectedPass: action.payload };

		case 'SET_RESERVATION_PROGRESS':
			return { ...state, reservationPurchaseInProgress: action.payload };

		case 'SET_PASS_PROGRESS':
			return { ...state, passPurchaseInProgress: action.payload };

		case 'SET_SHOW_LOST_PASSWORD':
			return { ...state, showLostPassword: action.payload };

		case 'SET_SHOW_CAREER_FORM':
			return { ...state, showCareerForm: action.payload };

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
