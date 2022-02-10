export default interface ClassType {
	classTitle: string;
	startDate: Date;
	startTime: Date;
	endTime: Date;
	classId: number;
	serviceId: number;
	url: string;

	maxSpot: number;
	availableSpot: number;

	employee: string;
	employeeId: number;
	employeeUrl: string;

	location: string;
	locationId: number;
	locationName: string;

	replacement: boolean;
	onlineAvailable: boolean;
	purchasable: true;
}
