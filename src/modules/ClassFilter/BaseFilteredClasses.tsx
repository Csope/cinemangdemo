import React, { useEffect, useState } from 'react';
import { useClassFilter } from '../../hooks';
import { SessionType, TrainerType } from '../../types';
import { ViewList } from '../../types/ClassFilterTypes';
import FilteredClassesCalendarView from './FilteredClassesCalendarView';
import FilteredClassesListView from './FilteredClassesListView';
import FilteredClassesSwiperView from './FilteredClassesSwiperView';
import { format, getHours } from 'date-fns';
import ExpandedFilter from './ExpandedFilter';

type PropTypes = {
	sessions: SessionType[];
	originalSessions: SessionType[];
	filterExpanded: boolean;
};

function BaseFilteredClasses({
	originalSessions,
	sessions,
	filterExpanded,
}: PropTypes) {
	const [filteredSessions, setFilteredSessions] = useState<SessionType[]>([]);

	const {
		classFilterState: { view, trainer, startTime, difficulty, location, type },
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
				if (sMin >= sHour || sMax <= sHour) {
					return false;
				}
			}

			return true;
		});

		setFilteredSessions(filtered);
	}, [trainer, startTime, difficulty, location, type, sessions]);

	return (
		<>
			<ExpandedFilter show={filterExpanded} sessions={filteredSessions} />
			<div>
				{view === ViewList.SWIPER && (
					<FilteredClassesSwiperView
						key={Math.random()}
						sessions={filteredSessions}
					/>
				)}
				{view === ViewList.CALENDAR && (
					<FilteredClassesCalendarView sessions={originalSessions} />
				)}
				{view === ViewList.LIST && (
					<FilteredClassesListView sessions={filteredSessions} />
				)}
			</div>
		</>
	);
}

export default BaseFilteredClasses;
