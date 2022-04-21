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
			showLostPassword,
			showCareerForm,
		},
		siteStatesDispatch,
	} = useContext(SiteStatesContext);

	const doHideLogin = () => {
		document.body.style.overflowY = 'auto';
		document.body.style.height = 'auto';

		siteStatesDispatch({ type: 'SHOW_LOGIN', payload: false });
	};

	const doShowLogin = () => {
		document.body.style.overflowY = 'hidden';
		document.body.style.height = '100vh';

		siteStatesDispatch({ type: 'SHOW_LOGIN', payload: true });
	};

	const doShowLostPassword = () => {
		siteStatesDispatch({ type: 'SET_SHOW_LOST_PASSWORD', payload: true });
	};
	const doHideLostPassword = () => {
		siteStatesDispatch({ type: 'SET_SHOW_LOST_PASSWORD', payload: false });
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

	const doShowCareerForm = () => {
		siteStatesDispatch({ type: 'SET_SHOW_CAREER_FORM', payload: true });
	};

	const doHideCareerForm = () => {
		siteStatesDispatch({ type: 'SET_SHOW_CAREER_FORM', payload: false });
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
		showLostPassword,
		doShowLostPassword,
		doHideLostPassword,
		showCareerForm,
		doShowCareerForm,
		doHideCareerForm,
	};
};

export default useSiteStates;
