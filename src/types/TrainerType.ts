export default interface TrainerType {
	first_name: string;
	last_name: string;
	description: string;
	motto: string;
	position: string;
	preview_url: string;
	related_class_types: object;
	gender: 'F' | 'M';
	others?: {
		videos?: string[];
	};
}
