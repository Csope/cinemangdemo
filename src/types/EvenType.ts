export default interface EventType {
	id: number;
	title: string;
	description: string;
	sort: number;
	enabled: boolean;
	event_id: number;
	preview_url?: string;
}
