export default interface PriceType {
	id: number;
	title: string;
	description: string;
	sort: number;
	prices: PriceItem[];
}

export interface PriceItem {
	id: number;
	title: string;
	description: string;
	price: string;
	quantity?: any;
	sort: number;
}
