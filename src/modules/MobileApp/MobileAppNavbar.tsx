import SLogo from '../../../public/images/S_log.svg';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaRegNewspaper } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { IoIosFitness } from 'react-icons/io';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import FloatingMenu from './FloatingMenu';
import { useRouter } from 'next/router';
import { ImPriceTags } from 'react-icons/im';
import LostPasswordSection from '../../common/site/LostPasswordSection';
import { useSiteStates } from '../../hooks';

const MobileAppNavbar = () => {
	const [showMore, setShowMore] = useState(false);
	const router = useRouter();

	const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setShowMore(!showMore);
	};

	return (
		<div className="mobile-app-nav">
			<div className="grid grid-cols-2 text-white">
				<Link href={'/mobile/timetable'} as="">
					<a style={{ fontSize: 10 }}>
						<div
							onClick={() => setShowMore(false)}
							className={`${
								router.pathname === '/mobile/timetable'
									? 'text-site-9'
									: 'text-white'
							} flex items-center justify-center flex-col h-full`}
						>
							<div className="icon text-xl">
								<IoIosFitness />
							</div>
							<div>Órarend</div>
						</div>
					</a>
				</Link>
				<Link href={'/mobile/trainers'} as="">
					<a style={{ fontSize: 10 }}>
						<div
							onClick={() => setShowMore(false)}
							className={`${
								router.pathname === '/mobile/trainers'
									? 'text-site-9'
									: 'text-white'
							} flex items-center justify-center flex-col h-full`}
						>
							<div className="icon text-xl">
								<IoIosPeople />
							</div>
							<div>Oktatók</div>
						</div>
					</a>
				</Link>
			</div>

			<div className="btn-logo">
				<Link href="/mobile/profile">
					<div className="icon" onClick={() => setShowMore(false)}>
						<img src={SLogo.src} />
					</div>
				</Link>
			</div>

			<div className="grid grid-cols-2 text-white">
				<Link href={'/mobile/news'} as="">
					<a style={{ fontSize: 10 }}>
						<div
							// #ae56ab
							onClick={() => setShowMore(false)}
							className={`${
								router.pathname === '/mobile/news'
									? 'text-site-9'
									: 'text-white'
							} flex items-center justify-center flex-col h-full`}
						>
							<div className="icon text-xl">
								<ImPriceTags className="mr-1" />
							</div>
							<div>Akciók</div>
						</div>
					</a>
				</Link>
				<div onClick={(e) => toggleMenu(e)}>
					<div className="flex items-center justify-center flex-col h-full">
						<div className="icon text-xl">
							<FiMoreHorizontal />
						</div>
						<div style={{ fontSize: 10 }}>Több</div>
					</div>
				</div>
			</div>

			<Transition
				show={showMore}
				enter="transition-all duration-75"
				enterFrom="left-full"
				enterTo="left-0 "
				leave="transition-all duration-150"
				leaveFrom="left-0 "
				leaveTo="left-full "
				className="floating-menu"
			>
				<FloatingMenu close={() => setShowMore(false)} />
			</Transition>
		</div>
	);
};

export default MobileAppNavbar;
