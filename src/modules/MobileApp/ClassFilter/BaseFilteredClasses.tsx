import React, { useEffect, useState } from 'react';
import { useClassFilter } from '../../../hooks';
import { SessionType } from '../../../types';
import { ViewList } from '../../../types/ClassFilterTypes';
import { getHours } from 'date-fns';
import FilteredClassesListView from '../../ClassFilter/FilteredClassesListView';
import FilteredClassesSwiperView from '../../ClassFilter/FilteredClassesSwiperView';
import { Transition } from '@headlessui/react';
import FloatingFilter from './FloatingFilter';
import ListCloseIcon from '../../../common/icons/ListCloseIcon';

type PropTypes = {
	sessions: SessionType[];
	originalSessions: SessionType[];
	filterExpanded: boolean;
	updateSession: (id: number) => void;
};

function BaseFilteredClasses({ sessions, updateSession }: PropTypes) {
	const [filteredSessions, setFilteredSessions] = useState<SessionType[]>([]);
	const [toggleFilter, setToggleFitler] = useState(false);

	const {
		classFilterState: {
			view,
			trainer,
			startTime,
			difficulty,
			location,
			type,
			startDate,
			search,
		},
	} = useClassFilter();

	useEffect(() => {
		const filtered = sessions.filter((session) => {
			if (location !== '' && location !== session.location.title) {
				return false;
			}

			if (type !== '' && type !== session.class.short_title) {
				return false;
			}

			if (difficulty && session.class.difficulty !== difficulty) {
				return false;
			}

			if (
				trainer !== '' &&
				trainer !== `${session.trainer.last_name} ${session.trainer.first_name}`
			) {
				return false;
			}

			if (startTime) {
				const sHour = getHours(new Date(session.start));

				const [sMin, sMax] = startTime;

				// TODO: FIX time filter
				if (sMin > sHour || sMax < sHour) {
					return false;
				}
			}

			if (search) {
				const trainerFullname =
					session.trainer.first_name + ' ' + session.trainer.last_name;
				const className = session.class.title;

				if (
					!trainerFullname.toLowerCase().includes(search.toLowerCase()) &&
					!className.toLowerCase().includes(search.toLowerCase())
				) {
					return false;
				}
			}

			return true;
		});

		setFilteredSessions(filtered);
	}, [trainer, startTime, difficulty, location, type, search, sessions]);

	return (
		<>
			<div>
				{view === ViewList.SWIPER && (
					<FilteredClassesSwiperView
						key={startDate.toString()}
						sessions={filteredSessions}
						swiperBg="bg-transparent"
						updateSession={updateSession}
					/>
				)}
				{view === ViewList.LIST && (
					<FilteredClassesListView
						sessions={filteredSessions}
						updateSession={updateSession}
					/>
				)}
			</div>

			<div
				className={`mobile-filter fixed z-20 bottom-20 bg-site-4 cursor-pointer -mb-2 text-3xl rounded-full right-4 transition-transform ${
					toggleFilter ? 'rotate-180' : ''
				}`}
				style={{
					border: '1px solid #6d457f',
				}}
			>
				<ListCloseIcon
					status={toggleFilter}
					clickEvent={() => setToggleFitler((prev) => !prev)}
				/>
			</div>

			<Transition
				show={toggleFilter}
				enter="transition-all duration-75"
				enterFrom="left-full"
				enterTo="left-0 "
				leave="transition-all duration-150"
				leaveFrom="left-0 "
				leaveTo="left-full "
				className="floating-filter z-10"
			>
				<FloatingFilter sessions={filteredSessions} />
			</Transition>
		</>
	);
}

export default BaseFilteredClasses;
