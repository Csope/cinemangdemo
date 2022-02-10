import React from 'react';

interface PropTypes {
	children: React.ReactNode;
	bgClass?: string;
	borderColor?: string;
}

const TriangleDividerNextItem = ({
	children,
	bgClass,
	borderColor,
}: PropTypes) => {
	return (
		<div
			className={`TriangleDividerNextItem ${
				bgClass ? bgClass : 'bg-site-2'
			} flex items-center justify-center`}
			style={{
				borderBottom: borderColor
					? `1px solid ${borderColor}`
					: '1px solid #bd9acc',
			}}
		>
			{children}
		</div>
	);
};

export default TriangleDividerNextItem;
