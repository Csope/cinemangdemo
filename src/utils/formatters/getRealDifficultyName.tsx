import { DifficultyTypes } from '../../types/ClassFilterTypes';

const getRealDifficultyName = (diffName: DifficultyTypes) => {
	switch (diffName) {
		case DifficultyTypes.BEGINNER:
			return 'Kezdő';
		case DifficultyTypes.NORMAL:
			return 'Normál';
		case DifficultyTypes.ADVENCED:
			return 'Haladó';

		default:
			return '';
	}
};

export default getRealDifficultyName;
