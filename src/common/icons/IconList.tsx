import React from 'react';

type PropTypes = {
	fillColor: string;
};

const IconList = ({ fillColor }: PropTypes) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="23px"
			height="23px"
			viewBox="0 0 386.57 359.26"
			fill={fillColor}
		>
			<path d="M344.02,17.01c12.3,0,22.31,10.01,22.31,22.31v21.3c0,12.3-10.01,22.31-22.31,22.31H39.32c-12.3,0-22.31-10.01-22.31-22.31v-21.3c0-12.3,10.01-22.31,22.31-22.31H344.02m0-17.01H39.32C17.6,0,0,17.6,0,39.32v21.3c0,21.71,17.6,39.32,39.32,39.32H344.02c21.71,0,39.32-17.6,39.32-39.32v-21.3c0-21.71-17.6-39.32-39.32-39.32h0Z" />
			<path d="M344.02,146.5c12.3,0,22.31,10.01,22.31,22.31v21.3c0,12.3-10.01,22.31-22.31,22.31H39.32c-12.3,0-22.31-10.01-22.31-22.31v-21.3c0-12.3,10.01-22.31,22.31-22.31H344.02m0-17.01H39.32c-21.71,0-39.32,17.6-39.32,39.32v21.3c0,21.71,17.6,39.32,39.32,39.32H344.02c21.71,0,39.32-17.6,39.32-39.32v-21.3c0-21.71-17.6-39.32-39.32-39.32h0Z" />
			<path d="M344.02,276c12.3,0,22.31,10.01,22.31,22.31v21.3c0,12.3-10.01,22.31-22.31,22.31H39.32c-12.3,0-22.31-10.01-22.31-22.31v-21.3c0-12.3,10.01-22.31,22.31-22.31H344.02m0-17.01H39.32c-21.71,0-39.32,17.6-39.32,39.32v21.3c0,21.71,17.6,39.32,39.32,39.32H344.02c21.71,0,39.32-17.6,39.32-39.32v-21.3c0-21.71-17.6-39.32-39.32-39.32h0Z" />
		</svg>
	);
};

export default IconList;