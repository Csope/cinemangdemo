import { ClassType } from '.';

/**
 * List of possible filter types
 */
export enum ViewList {
	SWIPER = 'SWIPER',
	CALENDAR = 'CALENDAR',
	LIST = 'LIST',
}

/**
 * List of difficulties
 */
export enum DifficultyTypes {
	BEGINNER = 'easy',
	NORMAL = 'medium',
	ADVENCED = 'difficult',
}

/**
 * List of categories
 */
export enum CategoryTypes {
	CARDIO = 'cardio',
	AMPLIFIER = 'amplifier',
	MOBILITY = 'mobility',
}

export interface ClassFilterStateTypes {
	view: ViewList;
	search: string;
	category: CategoryTypes | null;
	startTime: number[] | null;
	endTime: Date | null;
	startDate: Date[];
	difficulty: DifficultyTypes | null;
	location: string;
	type: string;
	trainer: string;
	favorites: boolean;
	classes: ClassType[];
}

export type ClassFilterActionTypes =
	| { type: 'SET_VIEW'; payload: ViewList }
	| { type: 'SET_START_TIME'; payload: number[] }
	| { type: 'SET_END_TIME'; payload: Date }
	| { type: 'SET_START_DATE'; payload: Date[] }
	| { type: 'SET_SEARCH'; payload: string }
	| { type: 'SET_CATEGORY'; payload: CategoryTypes | null }
	| { type: 'SET_DIFFICULTY'; payload: DifficultyTypes | null }
	| { type: 'SET_LOCATION'; payload: string }
	| { type: 'SET_TYPE'; payload: string }
	| { type: 'SET_TRAINER'; payload: string }
	| { type: 'SET_FAVORITES'; payload: boolean }
	| { type: 'SET_CLASSES'; payload: ClassType[] }
	| { type: 'RESET' };
