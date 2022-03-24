import React from 'react';
import { useReducer, createContext } from 'react';
import {
	SelectedSessionStateType,
	SelectedSessionActions,
} from '../types/SelectedSessionTypes';
import { SessionType } from '../types';

const initState: SelectedSessionStateType = {
	selectedSession: null,
};

const SelectedSessionContext = createContext<{
	selectedSessionState: SelectedSessionStateType;
	selectedSessionDispatch: React.Dispatch<SelectedSessionActions>;
}>({ selectedSessionState: initState, selectedSessionDispatch: () => null });

const SelectedSessionReducer = (
	state: SelectedSessionStateType,
	action: SelectedSessionActions
): SelectedSessionStateType => {
	switch (action.type) {
		case 'SET_SELECTED':
			return { ...state, selectedSession: action.payload };

		default:
			return state;
	}
};

interface PropTypes {
	children: JSX.Element;
}

const SelectedSessionProvider = ({ children }: PropTypes): JSX.Element => {
	const [selectedSessionState, selectedSessionDispatch] = useReducer(
		SelectedSessionReducer,
		initState
	);

	return (
		<SelectedSessionContext.Provider
			value={{ selectedSessionState, selectedSessionDispatch }}
		>
			{children}
		</SelectedSessionContext.Provider>
	);
};

export { SelectedSessionContext, SelectedSessionProvider };
