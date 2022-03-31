import React from 'react';

type PropType = {
	spinnerColor?: string;
};

const ContentLoader = ({ spinnerColor }: PropType) => {
	return (
		<div>
			<div
				style={{ borderTopColor: 'transparent' }}
				className={`w-16 h-16 border-4  border-double rounded-full animate-spin ${
					spinnerColor ? spinnerColor : 'border-site-4'
				}`}
			></div>
		</div>
	);
};

export default ContentLoader;
