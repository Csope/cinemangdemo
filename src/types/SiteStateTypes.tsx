import OrderType from './OrderTypes';
import PassType from './PassType';

export type SiteStatesTypes = {
	showLogin: boolean;
	selectedPass: PassType | null;
	reservationPurchaseInProgress: OrderType | false;
	passPurchaseInProgress: OrderType | false;
};

export type SiteStatesActions =
	| {
			type: 'SHOW_LOGIN';
			payload: boolean;
	  }
	| {
			type: 'SET_SELECTED_PASS';
			payload: PassType | null;
	  }
	| {
			type: 'SET_RESERVATION_PROGRESS';
			payload: OrderType | false;
	  }
	| {
			type: 'SET_PASS_PROGRESS';
			payload: OrderType | false;
	  };
