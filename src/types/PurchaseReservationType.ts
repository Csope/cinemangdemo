import SessionType from './SessionType';

export default interface PurchaseReservationType {
	customer_id: number;
	return_url: string;
	cart: {
		type: 'paid_reservation';
		quantity: 1;
		reference_id: number;
	}[];
	page_data: {
		session: SessionType;
	};
}
