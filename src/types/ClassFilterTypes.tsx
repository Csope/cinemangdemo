/**
 * List of possible filter types
 */
export enum ViewList {
	SWIPER = 'SWIPER',
	CALENDAR = 'CALENDAR',
	LIST = 'LIST',
}

export interface ClassFilterStateTypes {
	view: ViewList;
}

export type ClassFilterActionTypes =
	| { type: 'SET_VIEW'; payload: ViewList }
	| { type: 'RESET' };
