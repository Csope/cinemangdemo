import { SessionType } from '.';
import ReservabilityType from './ReservabilityType';

export type SelectedSessionStateType = {
	selectedSession: SessionType | null;
};

export type SelectedSessionActions = {
	type: 'SET_SELECTED';
	payload: SessionType | null;
};

// export type SelectedSessionActions =
// 	| { type: 'SET_SELECTED'; payload: SessionType | null }
// 	| { type: 'SET_RESERVABILITY'; payload: number };
