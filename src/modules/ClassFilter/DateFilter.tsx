import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { getNextDates } from '../../utils';
import { hu } from 'date-fns/locale';
import { useClassFilter } from '../../hooks';

function DateFilter(): JSX.Element {
	const {
		classFilterDispatch,
		classFilterState: { startDate },
	} = useClassFilter();
	const next7Dates = useMemo(() => getNextDates(7, true), []);
	const today = useMemo(
		() =>
			format(new Date(), 'MMMM d.', {
				locale: hu,
			}),
		[]
	);

	const generateDates = () => {
		const filteredStartDate = format(startDate, 'MMMM d.', {
			locale: hu,
		});

		return next7Dates.map((date, i) => {
			const formattedDate = format(date, 'MMMM d.', {
				locale: hu,
			});

			return (
				<div
					key={i}
					className={`w-1/3 md:w-auto py-2 md:px-6 inline-block cursor-pointer select-none ${
						filteredStartDate === formattedDate && 'bg-site-2'
					}`}
					onClick={() =>
						classFilterDispatch({ type: 'SET_START_DATE', payload: date })
					}
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
							{formattedDate}
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className="w-full bg-site-6 mt-8">
			<div className="container max-w-full md:max-w-none overflow-x-scroll md:overflow-x-auto whitespace-nowrap text-site-4 md:flex md:justify-center custom-scrollbar--dark">
				{generateDates()}
			</div>
		</div>
	);
}

export default DateFilter;
