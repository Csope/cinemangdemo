import React, { useEffect, useState } from 'react';
import { useClassFilter } from '../../hooks';
import { SessionType, TrainerType } from '../../types';
import { ViewList } from '../../types/ClassFilterTypes';
import FilteredClassesCalendarView from './FilteredClassesCalendarView';
import FilteredClassesListView from './FilteredClassesListView';
import FilteredClassesSwiperView from './FilteredClassesSwiperView';
import { format, getHours } from 'date-fns';
import ExpandedFilter from './ExpandedFilter';
import ActiveFilters from './ActiveFilters';

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
				if (sMin >= sHour || sMax <= sHour) {
					return false;
				}
			}

			if (search) {
				const trainerFullname =
					session.trainer.first_name + ' ' + session.trainer.last_name;
				const className = session.class.title;
				console.log(className);

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
			<ExpandedFilter
				show={filterExpanded && view !== ViewList.CALENDAR}
				sessions={filteredSessions}
			/>

			{view !== ViewList.CALENDAR && <ActiveFilters />}

			<div>
				{view === ViewList.SWIPER && (
					<FilteredClassesSwiperView
						key={startDate.toString()}
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
