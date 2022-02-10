import React from 'react';

interface PropTypes {
	text: string;
	customClasses?: string;
}

function SimpleButton({ text, customClasses }: PropTypes) {
	return (
		<button
			className={`block text-center rounded-2xl py-1 px-4 text-sm uppercase tracking-wider ${customClasses}`}
		>
			{text}
		</button>
	);
}

export default SimpleButton;
