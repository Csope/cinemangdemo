import PassType from "./PassType";

export default interface OwnedPassType {
	id: number;
	active: string;
	max_points: number;
	used_points: number;
	start: number;
	end: number;
	type: PassType
}
