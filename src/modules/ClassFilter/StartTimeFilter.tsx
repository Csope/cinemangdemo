import React, { useEffect, useState } from 'react';
import { Range } from 'rc-slider';
import { useClassFilter, useDebounce } from '../../hooks';
import marks from '../../static/startTimeMarks';

function StartTimeFilter() {
	const [sliderValue, setSliderValue] = useState([0, 14]);
	const debouncedValue = useDebounce(sliderValue, 500);
	const {
		classFilterDispatch,
		classFilterState: { startTime },
	} = useClassFilter();

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
		<div className="px-4">
			<div className="text-site-4 uppercase text-sm text-center mb-4 select-none">
				Kezdési időpont
			</div>
			<div className="relative">
				<div
					className="w-1 h-3 bg-site-4 absolute top-1/2 -translate-y-1/2"
					style={{ left: -2, zIndex: 1 }}
				></div>
				<Range
					min={0}
					max={14}
					marks={marks}
					step={1}
					onChange={(val) => setSliderValue(val)}
					value={sliderValue}
					// allowCross={false}
					handleStyle={[
						{
							width: 17,
							height: 17,
							backgroundColor: '#680b65',
							border: '2px solid white',
							zIndex: 2,
							boxShadow: '#680b6569 2px 1px 7px 0px',
						},
						{
							width: 17,
							height: 17,
							backgroundColor: '#680b65',
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
					trackStyle={[{ background: '#680b65' }]}
					railStyle={{ backgroundColor: '#ac8cbb' }}
				/>

				<div
					className="w-1 h-3 bg-site-4 absolute top-1/2 -translate-y-1/2"
					style={{ right: -4, zIndex: 1 }}
				></div>
			</div>
		</div>
	);
}

export default StartTimeFilter;
