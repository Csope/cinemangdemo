import React from 'react';
import CategoryFilter from './CategoryFilter';
import DateFilter from './DateFilter';
import FavoritesFilter from './FavoritesFilter';
import OtherFilter from './OtherFilter';
import SearchFilter from './SearchFilter';
import StartTimeFilter from './StartTimeFilter';

function ClassFilter(): JSX.Element {
	return (
		<div className="ClassFilter">
			<DateFilter />

			<div className="grid grid-col-1 md:flex-row bg-site-7 py-2">
				<div className="px-4 mb-6 mt-2 md:mt-0">
					<SearchFilter />
				</div>
				<div className="px-4 mb-6">
					<CategoryFilter />
				</div>
				<div className="px-4 mb-12">
					<StartTimeFilter />
				</div>
				<div className="px-4 mb-6 flex justify-evenly gap-4">
					<FavoritesFilter
						active={true}
						clickEvent={() => console.log('asdasd')}
					/>
					<OtherFilter />
				</div>
			</div>
		</div>
	);
}

export default ClassFilter;
