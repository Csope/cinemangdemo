import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { getNextDates } from '../../utils';
import { hu } from 'date-fns/locale';

function DateFilter(): JSX.Element {
	const next7Dates = useMemo(() => getNextDates(7, true), []);

	return (
		<div className="w-full bg-site-6 mt-8">
			<div className="container max-w-full md:max-w-none overflow-x-scroll md:overflow-x-auto whitespace-nowrap text-site-4 md:flex md:justify-center custom-scrollbar">
				{next7Dates.map((date, i) => (
					<div
						key={i}
						className={`w-1/3 md:w-auto py-2 md:px-6 inline-block ${
							i === 0 && 'bg-site-2'
						}`}
					>
						<div className="flex flex-col justify-center items-center">
							<div className="whitespace-nowrap uppercase text-xs">
								{i === 0
									? 'MA'
									: format(date, 'EEEE', {
											locale: hu,
									  })}
							</div>
							<div className="whitespace-nowrap uppercase text-sm">
								{format(date, 'MMMM d.', {
									locale: hu,
								})}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DateFilter;
