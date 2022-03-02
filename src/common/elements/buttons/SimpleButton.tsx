import React from 'react';

interface PropTypes {
	text: string;
	customClasses?: string;
	clickEvent: () => void;
}

function SimpleButton({ text, customClasses, clickEvent }: PropTypes) {
	return (
		<button
			onClick={clickEvent}
			className={`block text-center rounded-2xl py-1 px-4 text-sm uppercase tracking-wider ${customClasses}`}
		>
			{text}
		</button>
	);
}

export default SimpleButton;
