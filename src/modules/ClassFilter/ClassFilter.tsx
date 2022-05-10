import React, { useEffect, useState } from 'react';
import { useClassFilter, useFavorites } from '../../hooks';
import CategoryFilter from './CategoryFilter';
import DateFilter from './DateFilter';
import FavoritesFilter from './FavoritesFilter';
import OtherFilter from './OtherFilter';
import SearchFilter from './SearchFilter';
import StartTimeFilter from './StartTimeFilter';
import BaseFilteredClasses from './BaseFilteredClasses';
import { SessionType } from '../../types';
import { CategoryTypes, ViewList } from '../../types/ClassFilterTypes';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { getNextDates } from '../../utils';

type PropTypes = {
	sessions: SessionType[];
};

function ClassFilter({ sessions }: PropTypes): JSX.Element {
	const _f = useFavorites();
	const [filterExpanded, setFilterExpanded] = useState(false);
	const [filteredSessions, setFilteredSessions] = useState<SessionType[]>([]);
	const router = useRouter();
	const { s, v } = router.query;
	const {
		classFilterState: { favorites, view, startDate, category },
		classFilterDispatch,
	} = useClassFilter();

	/**
	 * FIlter by date, category, current time (do not show old classes)
	 */
	useEffect(() => {
		const fSessions = sessions.filter((session) => {
			const sDate = format(new Date(session.start), 'yyyy-MM-dd');
			const filDates = startDate.map((_sDate) => format(_sDate, 'yyyy-MM-dd'));

			if (favorites && !_f.favorites.includes(session.class.title))
				return false;

			if (!filDates.includes(sDate)) {
				return false;
			}

			if (category && category !== session.class.category) {
				return false;
			}

			if (new Date(session.start) <= new Date()) return false;

			return true;
		});

		setFilteredSessions(fSessions);
	}, [startDate, category, favorites, _f.favorites]);

	/**
	 * Close expended filter on view change
	 */
	useEffect(() => {
		setFilterExpanded(false);
	}, [view]);

	/**
	 * First mount effect
	 */
	useEffect(() => {
		if (s && v) {
			const dates = getNextDates(7, true);

			classFilterDispatch({
				type: 'SET_VIEW',
				payload: ViewList.LIST,
			});

			classFilterDispatch({
				type: 'SET_START_DATE',
				payload: dates,
			});

			if (s === 'category') {
				switch (v) {
					case CategoryTypes.AMPLIFIER:
						classFilterDispatch({
							type: 'SET_CATEGORY',
							payload: CategoryTypes.AMPLIFIER,
						});
						break;

					case CategoryTypes.CARDIO:
						classFilterDispatch({
							type: 'SET_CATEGORY',
							payload: CategoryTypes.CARDIO,
						});
						break;

					case CategoryTypes.MOBILITY:
						classFilterDispatch({
							type: 'SET_CATEGORY',
							payload: CategoryTypes.MOBILITY,
						});
						break;

					default:
						break;
				}
			}

			if (s === 'type') {
				classFilterDispatch({ type: 'SET_TYPE', payload: v[0] as string });
				classFilterDispatch({ type: 'SET_TRAINER', payload: v[1] as string });
			}

			if (s === 'trainer') {
				classFilterDispatch({ type: 'SET_TRAINER', payload: v as string });
			}
		}
	}, []);

	return (
		<div className="ClassFilter">
			{view !== ViewList.CALENDAR && (
				<>
					<DateFilter />
					<div className="bg-site-7">
						<div className="container lg:py-4">
							<div className="flex flex-col xl:flex-row py-2 xl:divide-x-2 xl:divide-site-3">
								<div className="w-full flex flex-col lg:flex-row lg:mb-8 xl:mb-0  xl:w-10/12 xl:divide-x-2 xl:divide-site-3">
									<div className="px-4 mb-6 mt-2 md:mt-0 lg:w-1/3 xl:w-1/4 lg:mb-0 xl:pb-4">
										<SearchFilter />
									</div>
									<div className="flex flex-col md:flex-row lg:w-2/3 xl:w-3/4 xl:divide-x-2 xl:divide-site-3">
										<div className="md:w-1/2 px-4 mb-6 xl:w-6/12 lg:mb-0 xl:pb-4">
											<CategoryFilter />
										</div>
										<div className="md:w-1/2 px-4 mb-12 xl:w-6/12 lg:mb-0 xl:pb-4">
											<StartTimeFilter />
										</div>
									</div>
								</div>
								<div className="w-full px-4 mb-6 flex justify-evenly gap-4 xl:w-2/12 lg:mb-0 xl:pb-4">
									<FavoritesFilter
										active={favorites}
										clickEvent={() =>
											classFilterDispatch({
												type: 'SET_FAVORITES',
												payload: !favorites,
											})
										}
									/>
									<OtherFilter
										show={filterExpanded}
										clickEvent={() => setFilterExpanded(!filterExpanded)}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<BaseFilteredClasses
				filterExpanded={filterExpanded}
				sessions={filteredSessions}
				originalSessions={sessions}
			/>
		</div>
	);
}

export default ClassFilter;
