import React from 'react';

type PropType = {
	spinnerColor?: string;
	width?: string;
	height?: string;
};

const ContentLoader = ({
	spinnerColor,
	width = 'w-16',
	height = 'h-16',
}: PropType) => {
	return (
		<div>
			<div
				style={{ borderTopColor: 'transparent' }}
				className={`${width} ${height} border-4  border-double rounded-full animate-spin ${
					spinnerColor ? spinnerColor : 'border-site-4'
				}`}
			></div>
		</div>
	);
};

export default ContentLoader;
