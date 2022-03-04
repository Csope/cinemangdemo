import React from 'react';

type PropTypes = {
	customClasses: string;
	fillColor: string;
};

const CardioBurnIcon = ({ customClasses, fillColor }: PropTypes) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			className={customClasses}
			fill={fillColor}
		>
			<g>
				<g>
					<path d="M16.39,1.08a1,1,0,0,0-1.29,1.37l.07.14a16.56,16.56,0,0,1,1.62,4.26c.38,2.17-.53,2.9-1.24,3.26a1.92,1.92,0,0,1-2-.37,2.14,2.14,0,0,1-.57-2.42,1,1,0,0,0-1.4-1.21C7.18,8.29,4,13.72,4,19a12,12,0,0,0,24,0C28,12.72,23.93,4.31,16.39,1.08ZM16,15a6,6,0,1,0,6,6A6,6,0,0,0,16,15Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,25Zm0,4A10,10,0,0,1,6,19,13.23,13.23,0,0,1,10.86,8.9a4,4,0,0,0,1.34,2.35,3.91,3.91,0,0,0,4.24.65c1.37-.68,2.88-2.18,2.32-5.39a12.37,12.37,0,0,0-.61-2.17A19.08,19.08,0,0,1,26,19,10,10,0,0,1,16,29Z" />
				</g>
			</g>
		</svg>
	);
};

export default CardioBurnIcon;
