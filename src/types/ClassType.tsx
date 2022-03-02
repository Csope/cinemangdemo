import { CategoryTypes, DifficultyTypes } from './ClassFilterTypes';
export default interface ClassType {
	description: string;
	difficulty: DifficultyTypes;
	enabled: boolean;
	id: number;
	new: boolean;
	short_title: string;
	title: string;
	category: CategoryTypes;
}
