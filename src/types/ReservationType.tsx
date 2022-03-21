import ClassType from './ClassType';
import LocationType from './LocationType';
import TrainerType from './TrainerType';

export default interface ReservationType {
	id: number;
	details: {
		session: {
			id: number;
			date: string;
			start: string;
			end: string;
		};
		class: ClassType;
		location: LocationType;
		trainer: TrainerType;
	};
}
