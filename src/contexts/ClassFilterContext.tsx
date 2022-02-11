import React from 'react';
import { useReducer, createContext } from 'react';
import { ViewList } from '../types/ClassFilterTypes';
import type {
	ClassFilterActionTypes,
	ClassFilterStateTypes,
} from '../types/ClassFilterTypes';

const initState: ClassFilterStateTypes = {
	view: ViewList.SWIPER,
};

const ClassFilterContext = createContext<{
	classFilterState: ClassFilterStateTypes;
	classFilterDispatch: React.Dispatch<ClassFilterActionTypes>;
}>({ classFilterState: initState, classFilterDispatch: () => null });

const ClassFilterReducer = (
	state: ClassFilterStateTypes,
	action: ClassFilterActionTypes
): ClassFilterStateTypes => {
	switch (action.type) {
		case 'SET_VIEW':
			return { ...state, view: action.payload };
		case 'RESET':
			return { ...state };
		default:
			return state;
	}
};

interface PropTypes {
	children: JSX.Element;
}

const ClassFilterProvider = ({ children }: PropTypes): JSX.Element => {
	const [classFilterState, classFilterDispatch] = useReducer(
		ClassFilterReducer,
		initState
	);

	return (
		<ClassFilterContext.Provider
			value={{ classFilterState, classFilterDispatch }}
		>
			{children}
		</ClassFilterContext.Provider>
	);
};

export { ClassFilterContext, ClassFilterProvider };
