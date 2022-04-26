export default interface PurchaseReservationResponse {
	http_status_code: number;
	status: boolean;
	message?: string;
	data?: {
		order: {
			hash: string;
			id: number;
			payload: object;
			payment_required: boolean;
			status: string;
			unique_id: string;
		};
		paymentUrl: string;
	};
	errors?: object[];
}
