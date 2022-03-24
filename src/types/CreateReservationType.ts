export default interface CreateReservationType {
	customer_id: number;
	return_url: string;
	cart: {
		type: 'reservation';
		quantity: 1;
		reference_id: number;
	}[];
}
