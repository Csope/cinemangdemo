import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { getNextDates } from '../../utils';
import { hu } from 'date-fns/locale';
import { useClassFilter } from '../../hooks';
import { ViewList } from '../../types/ClassFilterTypes';

function DateFilter(): JSX.Element {
	const {
		classFilterDispatch,
		classFilterState: { startDate, view },
	} = useClassFilter();
	const next7Dates = useMemo(() => getNextDates(7, true), []);

	const handleDateClick = (formattedDate: string, date: Date) => {
		const _formattedStartDates = startDate.map((_sDate) =>
			format(_sDate, 'MMMM d.', {
				locale: hu,
			})
		);

		const foundDateIndex = _formattedStartDates.indexOf(formattedDate);

		let newStartDates;

		if (foundDateIndex > -1) {
			const oldArr = [...startDate];
			oldArr.splice(foundDateIndex, 1);
			newStartDates = oldArr;
		} else {
			if (view === ViewList.SWIPER) {
				newStartDates = [date];
			} else {
				newStartDates = [...startDate, date];
			}
		}

		classFilterDispatch({ type: 'SET_START_DATE', payload: newStartDates });
	};

	const generateDates = () => {
		const filteredStartDate = startDate.map((_sDate) =>
			format(_sDate, 'MMMM d.', {
				locale: hu,
			})
		);

		return next7Dates.map((date, i) => {
			const formattedDate = format(date, 'MMMM d.', {
				locale: hu,
			});

			return (
				<div
					key={i}
					className={`w-1/3 md:w-auto py-2 md:px-6 inline-block cursor-pointer select-none ${
						filteredStartDate.includes(formattedDate) && 'bg-site-4 text-site-1'
					}`}
					onClick={() => handleDateClick(formattedDate, date)}
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
