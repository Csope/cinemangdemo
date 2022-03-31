import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';

const variants = {
	open: { opacity: 1, x: 0 },
	closed: { opacity: 0, x: '-100%' },
};

const menu = [
	{ title: 'Órák', path: '/' },
	{ title: 'Árak', path: '/prices' },
	{ title: 'Akciók/Események', path: '/sales-events' },
	{ title: 'Oktatók', path: '/trainers' },
	{ title: 'Órarend', path: '/timetable' },
];

const MobileNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'auto';
		}
	}, [isOpen]);

	return (
		<div className="md:hidden">
			<div className="text-2xl text-site-4" onClick={() => setIsOpen(!isOpen)}>
				<FiMenu />
			</div>
			<motion.div
				animate={isOpen ? 'open' : 'closed'}
				variants={variants}
				className="fixed h-screen w-screen bg-site-1 top-0 left-0 z-40 p-8"
			>
				<div
					className="absolute right-4 top-4 text-xl text-site-4"
					onClick={() => setIsOpen(false)}
				>
					<AiFillCloseCircle />
				</div>

				<div></div>
			</motion.div>
		</div>
	);
};

export default MobileNavbar;
