import { CategoryTypes, DifficultyTypes } from './ClassFilterTypes';
export default interface ClassType {
	description: string;
	difficulty: DifficultyTypes;
	id: number;
	preview_url: string;
	new: boolean;
	short_title: string;
	title: string;
	category: CategoryTypes;
}
