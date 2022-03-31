import React from 'react';

interface PropTypes {
	/**
	 * Margin top +/- px
	 */
	mTop?: number;
	customClasses?: string;
	bgClass: string;
}

const TriangleDivider = ({ mTop, bgClass, customClasses }: PropTypes) => {
	return (
		<div
			className={`${bgClass} TriangleDivider ${
				customClasses ? customClasses : ''
			}`}
			style={{ marginTop: mTop }}
		></div>
	);
};

export default TriangleDivider;
