import { motion } from 'framer-motion';
import React from 'react';

interface PropTypes {
	text: string | JSX.Element;
	customClasses?: string;
	appendBefore?: JSX.Element;
	appendAfter?: JSX.Element;
	clickEvent: (e: any) => void;
	disabled?: boolean;
}

function Btn({
	text,
	customClasses,
	clickEvent,
	appendAfter,
	appendBefore,
	disabled,
}: PropTypes) {
	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			disabled={disabled}
			onClick={clickEvent}
			className={`btn text-sm md:text-lg relative inline-block text-center cursor-pointer font-medium rounded-full pt-2 pb-2 px-10 uppercase tracking-widest ${
				customClasses || ''
			}`}
		>
			{appendBefore && appendBefore}
			{text}
			{appendAfter && appendAfter}
		</motion.button>
	);
}

export default Btn;

// relative btn inline-block text-center md:text-lg cursor-pointer font-medium rounded-full pt-2 pb-1 md:pt-2 md:pb-2 px-10 uppercase tracking-widest
