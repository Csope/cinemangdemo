import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

const variants = {
	open: { x: 0 },
	closed: { x: '-100%' },
};

const menu = [
	{ title: 'Kezdőlap', path: '/' },
	{ title: 'Árak', path: '/prices' },
	{ title: 'Akciók/Események', path: '/sales-events' },
	{ title: 'Oktatók', path: '/trainers' },
	{ title: 'Órarend', path: '/timetable' },
];

const MobileNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflowY = 'hidden';
			document.body.style.height = '100vh';
			document.getElementsByTagName('html')[0].style.overflow = 'hidden';
		} else {
			document.body.style.overflowY = 'auto';
			document.body.style.height = 'auto';
			document.getElementsByTagName('html')[0].style.overflow = 'auto';
		}
	}, [isOpen]);

	return (
		<div className="w-2/12 md:hidden">
			<div className="text-2xl text-site-4" onClick={() => setIsOpen(!isOpen)}>
				<FiMenu />
			</div>
			<motion.div
				animate={isOpen ? 'open' : 'closed'}
				transition={{ type: 'spring', bounce: 0 }}
				variants={variants}
				initial={{ x: '-100%' }}
				className="fixed h-screen w-screen bg-site-1 top-0 left-0 z-40 p-8 flex items-center justify-center"
			>
				<div
					className="absolute right-4 top-4 text-3xl text-site-4"
					onClick={() => setIsOpen(false)}
				>
					<AiFillCloseCircle />
				</div>

				<div className="text-center flex flex-col divide-y-2 divide-purple-50 divide-opacity-40">
					{menu.map((item) => (
						<div className="mb-3 pt-3" key={item.path}>
							<Link href={item.path}>
								<a
									className={`text-lg tracking-wider text-site-4 ${
										router.pathname === item.path ? 'font-bold' : ''
									}`}
									onClick={() => setIsOpen(!isOpen)}
								>
									{item.title}
								</a>
							</Link>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default MobileNavbar;
