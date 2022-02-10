import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import DateFilter from './DateFilter';
import ExpandedFilter from './ExpandedFilter';
import FavoritesFilter from './FavoritesFilter';
import FilteredClasses from './FilteredClasses';
import OtherFilter from './OtherFilter';
import SearchFilter from './SearchFilter';
import StartTimeFilter from './StartTimeFilter';

function ClassFilter(): JSX.Element {
	const [filterExpanded, setFilterExpanded] = useState(false);

	return (
		<div className="ClassFilter">
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
								active={true}
								clickEvent={() => console.log('asdasd')}
							/>
							<OtherFilter
								show={filterExpanded}
								clickEvent={() => setFilterExpanded(!filterExpanded)}
							/>
						</div>
					</div>
				</div>
			</div>
			<ExpandedFilter show={filterExpanded} />
			<div>
				<FilteredClasses />
			</div>
		</div>
	);
}

export default ClassFilter;
