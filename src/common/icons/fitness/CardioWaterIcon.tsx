import React from 'react';

type PropTypes = {
	customClasses: string;
	fillColor: string;
};

const CardioWaterIcon = ({ customClasses, fillColor }: PropTypes) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			className={customClasses}
			fill={fillColor}
		>
			<g>
				<g>
					<path d="M22.71,11.29C21.75,10.34,21,9.59,21,8V6.82A3,3,0,0,0,20,1H12a3,3,0,0,0-1,5.82V8c0,1.58-.75,2.33-1.71,3.29A6.2,6.2,0,0,0,7,16V26a5,5,0,0,0,5,5h8a5,5,0,0,0,5-5V16A6.2,6.2,0,0,0,22.71,11.29ZM12,3h8a1,1,0,0,1,0,2H12a1,1,0,0,1,0-2Zm-1.29,9.71A6.19,6.19,0,0,0,13,8V7h6V8a6.19,6.19,0,0,0,2.29,4.7A5.06,5.06,0,0,1,22.88,15,8.2,8.2,0,0,0,19,14a5.75,5.75,0,0,0-3.55,1.17A3.78,3.78,0,0,1,13,16a6.53,6.53,0,0,1-3.78-1.3A5.64,5.64,0,0,1,10.71,12.71ZM9,22H23v2H9Zm0-2V16.93A8.26,8.26,0,0,0,13,18a5.75,5.75,0,0,0,3.55-1.17A3.78,3.78,0,0,1,19,16a6.63,6.63,0,0,1,4,1.46V20Zm11,9H12a3,3,0,0,1-3-3H23A3,3,0,0,1,20,29Z" />
				</g>
			</g>
		</svg>
	);
};

export default CardioWaterIcon;
