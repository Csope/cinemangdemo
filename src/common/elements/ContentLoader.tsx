import React from 'react';

const ContentLoader = () => {
	return (
		<div>
			<div
				style={{ borderTopColor: 'transparent' }}
				className="w-16 h-16 border-4 border-site-4 border-double rounded-full animate-spin"
			></div>
		</div>
	);
};

export default ContentLoader;
