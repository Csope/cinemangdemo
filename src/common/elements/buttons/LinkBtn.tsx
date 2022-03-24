import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface PropTypes {
	text: string;
	customClasses?: string;
	appendBefore?: JSX.Element;
	appendAfter?: JSX.Element;
	href: string;
}

function LinkBtn({
	text,
	customClasses,
	href,
	appendAfter,
	appendBefore,
}: PropTypes) {
	return (
		<Link href={href}>
			<motion.a
				whileTap={{ scale: 0.95 }}
				style={{ fontSize: 17 }}
				className={`relative inline-block text-center text-lg cursor-pointer font-medium rounded-full pt-2 pb-2 px-10 uppercase tracking-widest ${
					customClasses || ''
				}`}
			>
				{appendBefore && appendBefore}
				{text}
				{appendAfter && appendAfter}
			</motion.a>
		</Link>
	);
}

export default LinkBtn;
