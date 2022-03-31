import { useContext } from 'react';
import { SiteStatesContext } from '../contexts';
import { PassType } from '../types';
import OrderType from '../types/OrderTypes';

const useSiteStates = () => {
	const {
		siteStates: {
			showLogin,
			selectedPass,
			reservationPurchaseInProgress,
			passPurchaseInProgress,
		},
		siteStatesDispatch,
	} = useContext(SiteStatesContext);

	const doHideLogin = () => {
		siteStatesDispatch({ type: 'SHOW_LOGIN', payload: false });
	};

	const doShowLogin = () => {
		siteStatesDispatch({ type: 'SHOW_LOGIN', payload: true });
	};

	const doSetSelectedPass = (passType: PassType | null) => {
		siteStatesDispatch({ type: 'SET_SELECTED_PASS', payload: passType });
	};

	const doShowReservationPurchaseResponse = (order: OrderType) => {
		siteStatesDispatch({ type: 'SET_RESERVATION_PROGRESS', payload: order });
	};

	const doHideReservationPurchaseResponse = () => {
		siteStatesDispatch({ type: 'SET_RESERVATION_PROGRESS', payload: false });
	};

	const doShowPassPurchaseResponse = (order: OrderType) => {
		siteStatesDispatch({ type: 'SET_PASS_PROGRESS', payload: order });
	};

	const doHidePassPurchaseResponse = () => {
		siteStatesDispatch({ type: 'SET_PASS_PROGRESS', payload: false });
	};

	return {
		siteStatesDispatch,
		doHideLogin,
		doShowLogin,
		doSetSelectedPass,
		showLogin,
		selectedPass,
		reservationPurchaseInProgress,
		doShowReservationPurchaseResponse,
		doHideReservationPurchaseResponse,
		passPurchaseInProgress,
		doShowPassPurchaseResponse,
		doHidePassPurchaseResponse,
	};
};

export default useSiteStates;
