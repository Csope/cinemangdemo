import { ClassType, LocationType, TrainerType } from '.';
export default interface SessionType {
	id: number;
	date: string;
	start: string;
	max_headcount: number;
	current_headcount: number;
	end: string;
	class: ClassType;
	location: LocationType;
	trainer: TrainerType;
}
