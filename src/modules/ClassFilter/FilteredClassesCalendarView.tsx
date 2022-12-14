import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getNextDates } from '../../utils';
import { Dialog } from '@headlessui/react';
import {
	isSameDay,
	format,
	getHours,
	getMinutes,
	differenceInMinutes,
} from 'date-fns';
import { hu } from 'date-fns/locale';
import { SessionType } from '../../types';
import { includes } from 'lodash';
import { IoClose } from 'react-icons/io5';
import ClassDescription from '../../common/site/ClassDescription';
import { BsCaretRightFill, BsCaretLeftFill } from 'react-icons/bs';
import { useActions } from '../../hooks';

type PropTypes = {
	sessions: SessionType[];
	updateSession: (id: number) => void;
};

function FilteredClassesCalendarView({ sessions, updateSession }: PropTypes) {
	const popupContent = useRef(null);
	const { doDisableScroll, doEnableScroll } = useActions();
	const calendarbox = useRef(null);
	const [indicatorTopPosition, setIndicatorTopPosition] = useState<number>(0);
	const [showDescription, setShowDescription] = useState<
		SessionType | undefined
	>(undefined);
	const [selectedLocation, setSelectedLocation] = useState('');
	const next7days = useMemo(() => getNextDates(7, true), []);

	const locations: string[] = [
		'Performance',
		'Aerobic',
		'Club Royal',
		'Spinning',
		'Balance',
		'Impulse',
		'Move',
	];

	const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

	let _sessions: any = [...Array(next7days.length)].map((e) =>
		Array(hours.length)
	);

	for (let i = 0; i < next7days.length; i++) {
		_sessions[i] = {};

		for (let l = 0; l < locations.length; l++) {
			for (let j = 0; j < hours.length; j++) {
				if (!_sessions[i][locations[l]]) {
					_sessions[i][locations[l]] = [];
				}

				_sessions[i][locations[l]][j] = false;
			}
		}
	}

	sessions.forEach((session) => {
		const start = new Date(session.start);
		const startHour = getHours(start);

		next7days.forEach((d, i) => {
			if (isSameDay(start, d)) {
				const dayIndex = i;
				const hourIndex = hours.indexOf(startHour);

				_sessions[dayIndex][session.location.title][hourIndex] = session;
			}
		});
	});

	const calculateTopPosition = () => {
		// setIndicatorTopPosition((oldVal) => oldVal + 30);

		const todayDateAt6 = new Date();
		todayDateAt6.setHours(6);
		todayDateAt6.setMinutes(0);
		todayDateAt6.setSeconds(0);

		// 16 cols, each height: 70 px
		const totalHeight = 16 * 70;

		// 16 cols, 1 col = 1 hour
		const _totalHeight = 16 * 60;

		const diffInMin = differenceInMinutes(new Date(), todayDateAt6);

		if (diffInMin < 0) return setIndicatorTopPosition(0);
		if (diffInMin >= _totalHeight) return setIndicatorTopPosition(0);

		const correctionPx = 2;

		const ratioDiffWith70Px =
			(totalHeight * diffInMin) / _totalHeight - correctionPx;

		const topValue = (ratioDiffWith70Px / totalHeight) * 100;

		setIndicatorTopPosition(topValue);
	};

	const generateLocations = () => {
		return (
			<div className="container max-w-full md:max-w-none overflow-x-scroll md:overflow-x-auto whitespace-nowrap text-site-4 md:flex md:justify-center custom-scrollbar--dark">
				{locations.map((location, i) => (
					<div
						key={i}
						className={`w-1/3 md:w-auto py-2 md:px-6 inline-block uppercase cursor-pointer select-none text-center ${
							selectedLocation === location ? 'bg-site-2' : ''
						}`}
						onClick={() => setSelectedLocation(location)}
					>
						<div>{location}</div>
						<div className="text-xs font-medium" style={{ color: '#965d94' }}>
							terem
						</div>
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
						<div className="time-col" key={hour}>
							{hour}:00
						</div>
					))}
				</div>
				{_sessions.map((day: any, dIndex: number) => {
					return (
						<div className="column" key={dIndex}>
							{Object.keys(day).map((_location, i) => {
								if (_location === selectedLocation) {
									return day[_location].map(
										(s: SessionType | false, _i: number) => {
											if (s) {
												const start = new Date(s.start);
												const end = new Date(s.end);
												const startFormat = format(start, 'HH:mm');
												const endFormat = format(end, 'HH:mm');
												const minutes = getMinutes(start);
												const diffInMinutes = differenceInMinutes(end, start);
												const unit = 60 / 70;
												const height = Math.round(diffInMinutes / unit) - 6;
												const top = (minutes / 60) * 100;

												const available = start >= new Date();
												return (
													<div
														className={`data-col ${
															!available ? 'not-available' : ''
														}`}
														key={_i}
													>
														<div
															onClick={() => available && setShowDescription(s)}
															className="data-item"
															style={{ height, top: `${top}%` }}
														>
															<div className="time">
																{startFormat}-{endFormat}
															</div>
															<div className="title">{s.class.title}</div>
															<div className="trainer">
																{s.trainer.last_name} {s.trainer.first_name}
															</div>
														</div>
													</div>
												);
											} else {
												return <div key={_i}></div>;
											}
										}
									);
								}
							})}
						</div>
					);
				})}
			</>
		);
	};

	useEffect(() => {
		setSelectedLocation(locations[0]);
		calculateTopPosition();

		const indicatorInterval = setInterval(() => {
			calculateTopPosition();
		}, 60000);

		return () => {
			clearInterval(indicatorInterval);
		};
	}, []);

	useEffect(() => {
		if (showDescription) {
			if (popupContent.current) {
				doDisableScroll(popupContent.current);
			}
		} else {
			doEnableScroll();
		}
	}, [showDescription]);

	return (
		<>
			<div className="mt-8 bg-site-1">
				<div className="bg-site-6">
					<div className="filtered-classes__calendar-locations container">
						{generateLocations()}
					</div>
				</div>
				<div className="overflow-x-auto custom-scrollbar--dark">
					<div style={{ minWidth: 1140 }}>
						<div className="bg-site-7">
							<div className="filtered-classes__calendar-dates container">
								{generateDates()}
							</div>
						</div>
						<div className="bg-site-1">
							<div
								className="filtered-classes__calendar container"
								ref={calendarbox}
							>
								{indicatorTopPosition > 0 && (
									<div
										className="current-time-indicator"
										style={{
											top: `${indicatorTopPosition}%`,
										}}
									>
										<div className="icon-left">
											<BsCaretRightFill />
										</div>
										<div className="icon-right">
											<BsCaretLeftFill />
										</div>
									</div>
								)}
								{generateCalendar()}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Dialog
				open={showDescription ? true : false}
				onClose={() => setShowDescription(undefined)}
				className="fixed z-10 inset-0 overflow-y-auto"
			>
				<div className="flex items-center justify-center min-h-screen rounded-2xl">
					<Dialog.Overlay className="hidden md:block fixed inset-0 opacity-70 bg-white" />

					<div
						ref={popupContent}
						className="fixed inset-0 bg-site-1 overflow-y-auto md:relative container md:bg-glow-purple md:rounded-2xl"
					>
						<div className="px-4 bg-site-8 py-3 md:rounded-tl-2xl md:rounded-tr-2xl ">
							<div className="relative ">
								<h1 className="h1-shadow h1-shadow--white text-center ">
									{showDescription?.class.title}
								</h1>
								<div
									onClick={() => setShowDescription(undefined)}
									className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-site-4 text-white p-1 cursor-pointer text-lg"
								>
									<IoClose />
								</div>
							</div>
						</div>
						<div className="bg-site-1 py-8 md:rounded-bl-2xl md:rounded-br-2xl">
							<div>
								<ClassDescription
									updateSession={updateSession}
									session={showDescription}
									hideParentPopup={() => setShowDescription(undefined)}
								/>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}

export default FilteredClassesCalendarView;
