import { SessionType } from '.';

export type SelectedSessionStateType = {
	selectedSession: SessionType | null;
	test: number | null;
};

export type SelectedSessionActions =
	| { type: 'SET_SELECTED'; payload: SessionType | null }
	| { type: 'SET_TEST2'; payload: number };
