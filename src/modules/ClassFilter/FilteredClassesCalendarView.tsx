import React, { useEffect, useMemo, useState } from 'react';
import { getNextDates } from '../../utils';
import {
	isSameDay,
	format,
	getHours,
	getMinutes,
	differenceInMinutes,
} from 'date-fns';
import { hu } from 'date-fns/locale';
import { SessionType } from '../../types';
// @ts-ignore
import { includes } from 'lodash';

type PropTypes = {
	sessions: SessionType[];
};

function FilteredClassesCalendarView({ sessions }: PropTypes) {
	const [selectedLocation, setSelectedLocation] = useState('');
	const next7days = useMemo(() => getNextDates(7, true), []);

	const locations: string[] = [];

	const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

	let _sessions = [...Array(next7days.length)].map((e) => Array(hours.length));

	for (let i = 0; i < next7days.length; i++) {
		_sessions[i] = [];

		for (let j = 0; j < hours.length; j++) {
			_sessions[i][j] = false;
		}
	}

	sessions.forEach((session) => {
		const start = new Date(session.start);
		const startHour = getHours(start);

		if (!includes(locations, session.location.title)) {
			locations.push(session.location.title);
		}

		next7days.forEach((d, i) => {
			if (isSameDay(start, d)) {
				const dayIndex = i;
				const hourIndex = hours.indexOf(startHour);

				_sessions[dayIndex][hourIndex] = session;
			}
		});
	});

	useEffect(() => {
		setSelectedLocation(locations[0]);
	}, []);

	const generateLocations = () => {
		return (
			<div className="container max-w-full md:max-w-none overflow-x-scroll md:overflow-x-auto whitespace-nowrap text-site-4 md:flex md:justify-center custom-scrollbar">
				{locations.map((location, i) => (
					<div
						key={i}
						className={`w-1/3 md:w-auto py-2 md:px-6 inline-block uppercase cursor-pointer select-none text-center ${
							selectedLocation === location ? 'bg-site-2' : ''
						}`}
						onClick={() => setSelectedLocation(location)}
					>
						{location}
					</div>
				))}
			</div>
		);
	};
	const generateDates = () => {
		return (
			<>
				<div className="py-4"></div>
				{next7days.map((date, i) => {
					const formattedDate = format(date, 'MMMM d.', {
						locale: hu,
					});

					return (
						<div key={i} className="py-4 text-site-4">
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
				})}
			</>
		);
	};

	const generateCalendar = () => {
		return (
			<>
				<div className="column">
					{hours.map((hour) => (
						<div className="time-col">{hour}:00</div>
					))}
				</div>
				{_sessions.map((day) => {
					return (
						<div className="column">
							{day.map((s) => {
								if (s && s.location.title === selectedLocation) {
									const start = new Date(s.start);
									const end = new Date(s.end);
									const startFormat = format(start, 'HH:mm');
									const endFormat = format(end, 'HH:mm');
									const minutes = getMinutes(start);
									const diffInMinutes = differenceInMinutes(end, start);
									const unit = 60 / 70;
									const height = Math.round(diffInMinutes / unit) - 6;
									const top = (minutes / 60) * 100;

									return (
										<div className="data-col">
											<div
												className="data-item"
												style={{ height, top: `${top}%` }}
											>
												<div className="time">
													{startFormat}-{endFormat}
												</div>
												<div className="title">{s.class.short_title}</div>
												<div className="trainer">
													{s.trainer.last_name} {s.trainer.first_name}
												</div>
											</div>
										</div>
									);
								} else {
									return <div></div>;
								}
							})}
						</div>
					);
				})}
			</>
		);
	};

	return (
		<div className="mt-8 pb-8">
			<div className="bg-site-6">
				<div className="filtered-classes__calendar-locations container">
					{generateLocations()}
				</div>
			</div>
			<div className="bg-site-7">
				<div className="filtered-classes__calendar-dates container">
					{generateDates()}
				</div>
			</div>
			<div className="bg-site-1">
				<div className="filtered-classes__calendar container">
					{generateCalendar()}
				</div>
			</div>
		</div>
	);
}

export default FilteredClassesCalendarView;
