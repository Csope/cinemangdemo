import PassType from './PassType';

export default interface PurchasePassType {
	customer_id: number;
	return_url: string;
	cart: {
		type: 'pass';
		quantity: 1;
		reference_id: number;
		misc: {
			start: string;
		};
	}[];
	page_data: {
		pass: PassType;
		startDate: string;
	};
}
