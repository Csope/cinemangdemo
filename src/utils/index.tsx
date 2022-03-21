import { getNextDates } from './dates/getDates';
import { validateEmail } from './validate';
import { removeAuthToken, setAuthToken } from './axiosSettings';
import getRealDifficultyName from './formatters/getRealDifficultyName';

export {
	getNextDates,
	validateEmail,
	setAuthToken,
	removeAuthToken,
	getRealDifficultyName,
};
