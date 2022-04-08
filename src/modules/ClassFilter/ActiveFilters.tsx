import React from 'react';
import SimpleButton from '../../common/elements/buttons/SimpleButton';
import { useClassFilter } from '../../hooks';
import { IoClose } from 'react-icons/io5';
import { getRealDifficultyName } from '../../utils';
import { AiFillStar } from 'react-icons/ai';
import { CategoryTypes } from '../../types/ClassFilterTypes';

const ActiveFilters = () => {
	const {
		classFilterState: {
			category,
			startTime,
			difficulty,
			location,
			type,
			trainer,
			favorites,
			search,
		},
		classFilterDispatch,
	} = useClassFilter();

	const show =
		category ||
		(startTime && !(startTime[0] == 6 && startTime[1] == 20)) ||
		difficulty ||
		location ||
		type ||
		trainer ||
		search ||
		favorites;

	if (!show) return null;

	const generateType = (category: CategoryTypes) => {
		switch (category) {
			case CategoryTypes.AMPLIFIER:
				return 'Erősítő';

			case CategoryTypes.CARDIO:
				return 'Cardio';

			case CategoryTypes.MOBILITY:
				return 'Mobilitás';

			default:
				break;
		}
	};

	return (
		<div className="bg-site-6">
			<div className="container flex justify-center gap-3 py-4 px-4">
				{search && (
					<SimpleButton
						// @ts-ignore
						text={`"${search}"`}
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_SEARCH', payload: '' })
						}
						customClasses="bg-white text-site-4"
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}
				{category && (
					<SimpleButton
						// @ts-ignore
						text={generateType(category as CategoryTypes)}
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_CATEGORY', payload: null })
						}
						customClasses="bg-white text-site-4"
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}
				{difficulty && (
					<SimpleButton
						text={getRealDifficultyName(difficulty)}
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_DIFFICULTY', payload: null })
						}
						customClasses="bg-white text-site-4"
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}
				{location && (
					<SimpleButton
						text={location}
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_LOCATION', payload: '' })
						}
						customClasses="bg-white text-site-4"
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}
				{type && (
					<SimpleButton
						text={type}
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_TYPE', payload: '' })
						}
						customClasses="bg-white text-site-4"
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}
				{trainer && (
					<SimpleButton
						text={trainer}
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_TRAINER', payload: '' })
						}
						customClasses="bg-white text-site-4"
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}
				{!startTime || (startTime[0] === 6 && startTime[1] === 20) ? null : (
					<SimpleButton
						text={`${startTime[0]}:00 - ${startTime[1]}:00`}
						customClasses="bg-white text-site-4"
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_START_TIME', payload: [6, 20] })
						}
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}

				{favorites && (
					<SimpleButton
						text={<AiFillStar className="text-site-4 text-lg" />}
						customClasses="bg-white text-site-4"
						clickEvent={() =>
							classFilterDispatch({ type: 'SET_FAVORITES', payload: false })
						}
						appendAfter={<IoClose className="ml-2 text-lg" />}
					/>
				)}
			</div>
		</div>
	);
};

export default ActiveFilters;
