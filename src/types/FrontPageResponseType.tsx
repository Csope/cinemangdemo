import ClassType from './ClassType';

export default interface FrontPageResponseType {
	events: {
		id: number;
		title: string;
		description: string;
		sort: number;
		preview_url: string;
	}[];
	class_types: {
		cardio: ClassType[];
		mobility: ClassType[];
		aplifier: ClassType[];
	};
}
