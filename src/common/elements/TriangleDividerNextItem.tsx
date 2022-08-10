import React from 'react';

interface PropTypes {
	children: React.ReactNode;
	bgClass?: string;
	borderColor?: string;
	mTop?: number;
	height?: number;
	customClass?: string;
}

const TriangleDividerNextItem = ({
	children,
	bgClass,
	borderColor,
	mTop,
	height,
	customClass,

}: PropTypes) => {
	return (
		<div
			className={`TriangleDividerNextItem ${customClass} ${
				bgClass ? bgClass : 'bg-site-2'
			} ${ mTop ? mTop : '' } flex items-center justify-center`}
			style={{marginTop: mTop, height: height }}
			// style={{
			// 	borderBottom: borderColor
			// 		? `1px solid ${borderColor}`
			// 		: '1px solid #bd9acc',
			// }}
		>
			{children}
		</div>
	);
};

export default TriangleDividerNextItem;
