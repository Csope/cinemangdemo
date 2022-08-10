import { motion } from 'framer-motion';
import React from 'react';

interface PropTypes {
	text: string | JSX.Element;
	customClasses?: string;
	clickEvent?: () => void;
	appendBefore?: JSX.Element;
	appendAfter?: JSX.Element;
}

function SimpleButton({
	text,
	customClasses,
	clickEvent,
	appendAfter,
	appendBefore,
}: PropTypes) {
	return (
		<motion.button
			onClick={clickEvent}
			className={`flex items-center justify-center text-center rounded-3xl py-1 px-4 uppercase tracking-wider ${customClasses}`}
			>
			{appendBefore && appendBefore}
			{text}
			{appendAfter && appendAfter}
		</motion.button>
	);
}

export default SimpleButton;
