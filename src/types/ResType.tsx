export enum DataTypes {
	TRAINER = 'trainer',
	TRAINERS = 'trainers',
	SESSIONS = 'sessions',
}

export enum HttpCodeTypes {
	_200 = 200,
}

export default interface ResType<T> {
	http_status_code: number;
	status: boolean;
	message?: string;
	data: {
		[k in DataTypes]: T;
	};
	// errors?: object[];
}
