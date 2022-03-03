import Link from 'next/link';
import React, { useState } from 'react';
import HeaderUser from './HeaderUser';
import { RiMenu5Line } from 'react-icons/ri';
import { Transition } from '@headlessui/react';

const MainNavbar = (): JSX.Element => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	return (
		<>
			<div className="relative">
				<div className="md:hidden">
					<div className="block md:hidden">
						<RiMenu5Line
							className="mx-auto"
							onClick={() => setMenuOpen(!menuOpen)}
						/>
					</div>
					<Transition
						show={menuOpen}
						enter="transition-all duration-300 z-50 relative"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-all duration-300 z-50 relative"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="flex flex-col  absolute top-full left-0 right-0 z-50 bg-site-1">
							<nav className="w-full text-center flex flex-col  justify-center gap-4 uppercase p-6 md:p-2  text-md text-site-4">
								<Link href={'/'}>Órák</Link>
								<Link href={'/prices'}>Árak</Link>
								<Link href={'/sales-events'}>Akciók/Események</Link>
								<Link href={'/trainers'}>Oktatók</Link>
								<Link href={'/timetable'}>Órarend</Link>
							</nav>
							<div className="text-center">
								<HeaderUser />
							</div>
						</div>
					</Transition>
				</div>
				<div className="hidden md:block">
					<div className="flex flex-col top-full left-0 right-0 z-50 ">
						<nav className="w-full text-center flex flex-row justify-center gap-8 uppercase p-6 md:p-2  text-md text-site-4">
							<Link href={'/'}>Órák</Link>
							<Link href={'/prices'}>Árak</Link>
							<Link href={'/sales-events'}>Akciók/Események</Link>
							<Link href={'/trainers'}>Oktatók</Link>
							<Link href={'/timetable'}>Órarend</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="hidden md:block text-center absolute right-4 top-1/2 -translate-y-1/2 ">
				<HeaderUser />
			</div>
		</>
	);
};

export default MainNavbar;
