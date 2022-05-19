import ClassType from './ClassType';

export default interface FrontPageResponseType {
	banners: {
		id: number;
		target_url: string;
		type: number;
		picture_url: string;
	}[];
	class_types: {
		cardio: ClassType[];
		mobility: ClassType[];
		aplifier: ClassType[];
	};
}
