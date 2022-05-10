import React from 'react';
import { useReducer, createContext } from 'react';
import { ViewList } from '../types/ClassFilterTypes';
import type {
	ClassFilterActionTypes,
	ClassFilterStateTypes,
} from '../types/ClassFilterTypes';

const initState: ClassFilterStateTypes = {
	view: ViewList.SWIPER,
	search: '',
	category: null,
	startTime: null,
	endTime: null,
	startDate: [new Date()],
	difficulty: null,
	location: '',
	type: '',
	trainer: '',
	favorites: false,
	classes: [],
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
		case 'SET_START_TIME':
			return { ...state, startTime: action.payload };
		case 'SET_END_TIME':
			return { ...state, endTime: action.payload };
		case 'SET_START_DATE':
			return { ...state, startDate: action.payload };
		case 'SET_SEARCH':
			return { ...state, search: action.payload };
		case 'SET_CATEGORY':
			return { ...state, category: action.payload };
		case 'SET_DIFFICULTY':
			return { ...state, difficulty: action.payload };
		case 'SET_LOCATION':
			return { ...state, location: action.payload };
		case 'SET_TYPE':
			return { ...state, type: action.payload };
		case 'SET_TRAINER':
			return { ...state, trainer: action.payload };
		case 'SET_FAVORITES':
			return { ...state, favorites: action.payload };
		case 'SET_CLASSES':
			return { ...state, classes: action.payload };
		case 'RESET':
			return {
				...state,
				view: state.view,
				startDate: state.startDate,
				classes: state.classes,
			};
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
