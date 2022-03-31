import Link from 'next/link';
import React, { useState } from 'react';
import HeaderUser from './HeaderUser';
import { RiMenu5Line } from 'react-icons/ri';
import { Transition } from '@headlessui/react';
import { useUser } from '../../hooks';
import { useRouter } from 'next/router';

const menu = [
	{ title: 'Órák', path: '/' },
	{ title: 'Árak', path: '/prices' },
	{ title: 'Akciók/Események', path: '/sales-events' },
	{ title: 'Oktatók', path: '/trainers' },
	{ title: 'Órarend', path: '/timetable' },
];

const MainNavbar = (): JSX.Element => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const router = useRouter();
	const { status } = useUser();

	return (
		<>
			<div>
				<div className="relative">
					<div className="hidden md:block">
						<div className="flex flex-col top-full left-0 right-0 z-50 ">
							<nav className="w-full text-center flex flex-row justify-center gap-8 uppercase p-6 md:p-2  text-md text-site-4">
								{menu.map((item, i) => (
									<Link key={i} href={item.path}>
										<a
											className={
												router.pathname === item.path ? 'font-black' : ''
											}
										>
											{item.title}
										</a>
									</Link>
								))}
							</nav>
						</div>
					</div>
				</div>
				<div className="hidden md:block text-center absolute right-4 top-1/2 -translate-y-1/2 nav-user z-10">
					<HeaderUser />
				</div>
			</div>
		</>
	);
};

export default MainNavbar;
