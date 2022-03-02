import React from 'react';
import SimpleButton from '../../common/elements/buttons/SimpleButton';
import { useClassFilter } from '../../hooks';
import { SessionType } from '../../types';
import { DifficultyTypes } from '../../types/ClassFilterTypes';
// @ts-ignore
import { includes } from 'lodash';

interface PropTypes {
	show: boolean;
	sessions: SessionType[];
}

function ExpandedFilter({ show, sessions }: PropTypes) {
	const {
		classFilterState: { difficulty, trainer, location, type },
		classFilterDispatch,
	} = useClassFilter();

	const _trainers: string[] = [];
	const _locations: string[] = [];
	const _difficulties: string[] = [];
	const _types: string[] = [];

	sessions.forEach((session) => {
		if (
			!includes(
				_trainers,
				`${session.trainer.last_name} ${session.trainer.first_name}`
			)
		)
			_trainers.push(
				`${session.trainer.last_name} ${session.trainer.first_name}`
			);

		if (!includes(_locations, session.location.title))
			_locations.push(session.location.title);

		if (!includes(_difficulties, session.class.difficulty))
			_difficulties.push(session.class.difficulty);

		if (!includes(_types, session.class.short_title))
			_types.push(session.class.short_title);
	});

	const setDifficultyClick = (type: DifficultyTypes) => {
		if (type === difficulty) {
			classFilterDispatch({
				type: 'SET_DIFFICULTY',
				payload: null,
			});
		} else {
			classFilterDispatch({
				type: 'SET_DIFFICULTY',
				payload: type,
			});
		}
	};

	const setTrainerClick = (_trainer: string) => {
		if (_trainer === trainer) {
			classFilterDispatch({
				type: 'SET_TRAINER',
				payload: '',
			});
		} else {
			classFilterDispatch({
				type: 'SET_TRAINER',
				payload: _trainer,
			});
		}
	};

	const setTypeClick = (_type: string) => {
		if (_type === type) {
			classFilterDispatch({
				type: 'SET_TYPE',
				payload: '',
			});
		} else {
			classFilterDispatch({
				type: 'SET_TYPE',
				payload: _type,
			});
		}
	};

	const setLocationClick = (_location: string) => {
		if (_location === location) {
			classFilterDispatch({ type: 'SET_LOCATION', payload: '' });
		} else {
			classFilterDispatch({ type: 'SET_LOCATION', payload: _location });
		}
	};

	return (
		<div
			className={`bg-site-7 ExpandedFilter ${
				show ? 'ExpandedFilter--show' : ''
			}`}
		>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4 ">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28 select-none">
						Nehézség
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						<SimpleButton
							customClasses={`${
								difficulty === DifficultyTypes.BEGINNER
									? 'bg-site-2 text-white'
									: 'bg-white text-black'
							}`}
							clickEvent={() => setDifficultyClick(DifficultyTypes.BEGINNER)}
							text="Kezdő"
						/>
						<SimpleButton
							customClasses={`${
								difficulty === DifficultyTypes.NORMAL
									? 'bg-site-2 text-white'
									: 'bg-white text-black'
							}`}
							clickEvent={() => setDifficultyClick(DifficultyTypes.NORMAL)}
							text="Normál"
						/>
						<SimpleButton
							customClasses={`${
								difficulty === DifficultyTypes.ADVENCED
									? 'bg-site-2 text-white'
									: 'bg-white text-black'
							}`}
							clickEvent={() => setDifficultyClick(DifficultyTypes.ADVENCED)}
							text="Haladó"
						/>
					</div>
				</div>
			</div>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28 select-none">
						Terem
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						{_locations.map((_location) => (
							<SimpleButton
								key={_location}
								customClasses={
									_location === location
										? 'bg-site-2 text-white'
										: 'bg-white text-black'
								}
								text={_location}
								clickEvent={() => setLocationClick(_location)}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4 ">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28 select-none">
						Óratípus
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						{_types.map((_type) => (
							<SimpleButton
								key={_type}
								clickEvent={() => setTypeClick(_type)}
								customClasses={
									type === _type
										? 'bg-site-2 text-white'
										: 'bg-white text-black '
								}
								text={_type}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4 ">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28 select-none">
						Oktató
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						{_trainers.map((_trainer) => (
							<SimpleButton
								key={_trainer}
								customClasses={`${
									trainer === _trainer
										? 'bg-site-2 text-white'
										: 'bg-white text-black'
								}`}
								clickEvent={() => setTrainerClick(_trainer)}
								text={_trainer}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExpandedFilter;
