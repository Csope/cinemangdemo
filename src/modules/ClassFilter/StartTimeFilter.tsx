import React from 'react';
import { Range } from 'rc-slider';

const marks = {
	0: {
		style: {
			color: 'black',
		},
		label: <span>8:00</span>,
	},
	1: {
		style: {
			color: 'black',
		},
		label: <span>8:30</span>,
	},
	2: {
		style: {
			color: 'black',
		},
		label: <span>9:00</span>,
	},
	3: {
		style: {
			color: 'black',
		},
		label: <span>12:00</span>,
	},
};

function StartTimeFilter() {
	function log(value: any) {
		console.log(value); //eslint-disable-line
	}

	return (
		<div className="px-4">
			<div className="text-site-4 uppercase text-sm text-center mb-4">
				Kezdési időpont
			</div>
			<div className="relative">
				<div
					className="w-1 h-3 bg-site-4 absolute top-1/2 -translate-y-1/2"
					style={{ left: -2, zIndex: 1 }}
				></div>
				<Range
					min={0}
					max={3}
					marks={marks}
					step={1}
					onChange={log}
					defaultValue={[0, 3]}
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
