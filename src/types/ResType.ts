export enum DataTypes {
	TRAINER = 'trainer',
	TRAINERS = 'trainers',
	SESSION = 'session',
	SESSIONS = 'sessions',
	USER = 'user',
	TOKEN = 'token',
	OWNEDPASS = 'passes',
	PASSESTYPES = 'pass_types',
	RESERVATIONS = 'reservations',
	RESERVABILITY = 'reservability',
	FRONTPAGE = 'frontpage',
	ORDER = 'order',
}

export default interface ResType<T> {
	http_status_code: number;
	status: boolean;
	message?: string;
	data: {
		[k in DataTypes]?: T;
	};
	errors?: object[];
}
