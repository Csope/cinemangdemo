import React, { useEffect, useState } from 'react';
import { Range } from 'rc-slider';
import { useClassFilter, useDebounce } from '../../hooks';
import marks from '../../static/startTimeMarks';

function StartTimeFilter() {
	const {
		classFilterDispatch,
		classFilterState: { startTime },
	} = useClassFilter();

	const min = Object.keys(marks).find(
		(key: any) => startTime && marks[key].value === startTime[0]
	);

	const max = Object.keys(marks).find(
		(key: any) => startTime && marks[key].value === startTime[1]
	);

	const initMinMax = [parseInt(min || ''), parseInt(max || '')];

	const [sliderValue, setSliderValue] = useState([
		initMinMax[0] || 3,
		initMinMax[1] || 9,
	]);
	const debouncedValue = useDebounce(sliderValue, 500);

	useEffect(() => {
		const [min, max] = debouncedValue;

		classFilterDispatch({
			type: 'SET_START_TIME',
			payload: [marks[min].value, marks[max].value],
		});
	}, [debouncedValue]);

	useEffect(() => {
		if (startTime) {
			const min = Object.keys(marks).find(
				(key: any) => marks[key].value === startTime[0]
			);

			const max = Object.keys(marks).find(
				(key: any) => marks[key].value === startTime[1]
			);

			// @ts-ignore
			if (min == sliderValue[0] && max == sliderValue[1]) {
				return;
			}

			// @ts-ignore
			setSliderValue([min, max]);
		}
	}, [startTime]);

	return (
		<div className="px-4 flex gap-10">
			<div className="text-site-6 uppercase text-sm mb-4">
				Kezdési időpont
			</div>
			<div className="relative w-72">
				<div
					className="w-1 h-3 bg-site-4 absolute top-2 -translate-y-1/2"
					style={{ left: -2, zIndex: 1 }}
				></div>
				<Range
					min={0}
					max={9}
					marks={marks}
					step={1}
					onChange={(val) => setSliderValue(val)}
					value={sliderValue}
					// allowCross={false}
					handleStyle={[
						{
							width: 17,
							height: 17,
							backgroundColor: '#6573a4',
							border: '2px solid white',
							zIndex: 2,
							boxShadow: '#680b6569 2px 1px 7px 0px',
						},
						{
							width: 17,
							height: 17,
							backgroundColor: '#6573a4',
							border: '2px solid white',
							zIndex: 2,
							boxShadow: '#680b6569 2px 1px 7px 0px',
						},
					]}
					dotStyle={{
						backgroundColor: 'none',
						width: 0,
						height: 0,
						border: 'none',
					}}
					trackStyle={[{ background: '#6573a4' }]}
					railStyle={{ backgroundColor: '#d6dcec' }}
				/>

				<div
					className="w-1 h-3 bg-site-4 absolute top-2 -translate-y-1/2"
					style={{ right: -4, zIndex: 1 }}
				></div>
			</div>
		</div>
	);
}

export default StartTimeFilter;
