export default interface OrderType {
	id: number;
	unique_id: string;
	hash: string;
	status: 'COMPLETED' | 'FAILED';
	payment_required: boolean;
	request: Request;
	payload: Payload;
	progress?: string[] | null;
}

export interface Request {
	cart?: CartEntity[] | null;
	customer_id: number;
	return_url: string;
	page_data: object;
}

export interface CartEntity {
	type: string;
	quantity: number;
	reference_id: number;
}

export interface Payload {
	customer: Customer;
	items?: ItemsEntity[] | null;
	purchases: { [key: string]: Purchases }[];
	completed_purchase: Purchases;
	return_url: string;
	price_sum: number;
}

export interface Customer {
	name: string;
	email: string;
	reference_id: number;
}

export interface ItemsEntity {
	id: string;
	title: string;
	details: Details;
	misc?: null[] | null;
	reference_id: number;
	quantity: number;
	price: number;
	fulfilled: boolean;
	item_ids?: number[] | null;
	type: string;
}

export interface Details {
	class_type: string;
	start: string;
	trainer: string;
	location: string;
}

export interface Purchases {
	id: number;
	status: string;
	order_ref: string;
	customer_name: string;
	customer_email: string;
	price: string;
	currency: string;
	simple_start: string;
	simple_end: string;
	transaction_id: string;
	simple_return: SimpleReturn;
	ipn?: null;
}

export interface SimpleReturn {
	r: number;
	t: number;
	e: string;
	m: string;
	o: string;
}
