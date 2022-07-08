import { getNextDates } from './dates/getDates';
import { validateEmail } from './validate';
import { removeAuthToken, setAuthToken } from './axiosSettings';
import getRealDifficultyName from './formatters/getRealDifficultyName';
import getHufFormat from './formatters/getHufFormat';
import { openUrl } from './native-app/nativeAppFunctions';
import { genSvgImageLoader } from './helpers';

export {
	getNextDates,
	validateEmail,
	setAuthToken,
	removeAuthToken,
	getRealDifficultyName,
	getHufFormat,
	openUrl,
	genSvgImageLoader,
};
