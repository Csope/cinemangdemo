export default interface ResType {
	code: 200 | 404 | 501;
	status: boolean;
	message: string;
	data: object;
}
