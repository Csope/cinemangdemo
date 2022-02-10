import { addDays } from 'date-fns';

/**
 *	Get the next dates from today
 * @param number Number of dates
 * @param includeToday Whether the list should include today or not
 * @returns Date[]
 */
export function getNextDates(
	number: number,
	includeToday: boolean = false
): Date[] {
	const today = new Date();
	const nextDates: Date[] = [];

	if (includeToday) {
		for (let index = 0; index < number; index++) {
			const nextDate = addDays(today, index);
			nextDates.push(nextDate);
		}
	} else {
		for (let index = 1; index <= number; index++) {
			const nextDate = addDays(today, index);
			nextDates.push(nextDate);
		}
	}

	return nextDates;
}
