import React from 'react';

interface PropTypes {
	/**
	 * Margin top +/- px
	 */
	mTop?: number;
	customClasses?: string;
}

const TriangleDivider = ({ mTop, customClasses }: PropTypes) => {
	return (
		<div
			className={`bg-site-3 TriangleDivider ${customClasses}`}
			style={{ marginTop: mTop }}
		></div>
	);
};

export default TriangleDivider;
