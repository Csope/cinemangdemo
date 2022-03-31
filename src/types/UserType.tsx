export interface RegisterUserType {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	gender: 'F' | 'M' | 'X';
	birth_date: string;
	newslatter: boolean;
}
export interface UpdateUserType {
	last_name: string;
	first_name: string;
	birth_date: string;
	gender: 'F' | 'M';
	password?: string;
	new_password?: string;
}
export default interface UserType {
	id: number;
	last_name: string;
	first_name: string;
	email: string;
	birth_date: string;
	gender: 'F' | 'M';
	barcode: string;
	avatar: string;
}
