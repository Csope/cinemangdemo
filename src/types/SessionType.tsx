import { ClassType, LocationType, TrainerType } from '.';
export default interface SessionType {
	start: string;
	end: string;
	date: string;
	class: ClassType;
	trainer: TrainerType;
	open_day: boolean;
	max_headcount: number;
	current_headcount: number;
	location: LocationType;
	id: number;
	frequented_type: any;
	frequented: boolean;

	// employeeName: string;
	// location: number;
	// sessionId: number;
	// sessionName: string;
}
