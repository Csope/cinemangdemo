import { Menu, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { useUser, useSiteStates, useActions } from '../../hooks';
import { UserIcon } from '@heroicons/react/solid';
import { IoTriangle } from 'react-icons/io5';
import Link from 'next/link';
import * as Avatars from '../../common/icons/avatars/Avatars';
import DefaultUserImage from '../../../public/images/avatars/bronze.png';
import { motion } from 'framer-motion';
import { AiFillCloseCircle } from 'react-icons/ai';

const variants = {
	open: { x: 0 },
	closed: { x: '100%' },
};

const menu = [{ title: 'Profil', path: '/profile' }];

const MobileHeaderUser = () => {
	const { doDisableScroll, doEnableScroll } = useActions();
	const { doSignOut, user } = useUser();
	const [isOpen, setIsOpen] = useState(false);
	const { showLogin, doShowLogin, doHideLogin } = useSiteStates();
	const { status } = useSession();
	const popupContent = useRef(null);

	const toggleLogin = () => {
		if (status === 'loading') return;

		if (status === 'unauthenticated') {
			doShowLogin();
		}
	};

	const doLogout = () => {
		doSignOut();
	};

	useEffect(() => {
		if (isOpen) {
			if (popupContent.current) {
				doDisableScroll(popupContent.current);
			}
		} else {
			doEnableScroll();
		}
	}, [isOpen]);

	return (
		<div className="w-2/12 md:hidden">
			{status === 'authenticated' ? (
				<div className="nav-user__image" onClick={() => setIsOpen(!isOpen)}>
					<div className="relative flex justify-end">
						{user?.avatar ? (
							<img
								// @ts-ignore
								src={Avatars[user.avatar].src}
								className=" bg-glow-purple"
							/>
						) : (
							<div className="h-10 w-10 bg-gray-200 border saturate-0  border-site-2 rounded-full cursor-pointer bg-glow-purple relative">
								<img src={DefaultUserImage.src} />
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="flex justify-end" onClick={toggleLogin}>
					<div className="h-10 w-10 bg-gray-200 border saturate-0  border-site-2 rounded-full cursor-pointer bg-glow-purple relative">
						<img src={DefaultUserImage.src} />
					</div>
				</div>
			)}

			<motion.div
				ref={popupContent}
				animate={isOpen && status === 'authenticated' ? 'open' : 'closed'}
				transition={{ type: 'spring', bounce: 0 }}
				initial={{ x: '100%' }}
				variants={variants}
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
						<div className="mb-3" key={item.path}>
							<Link href={item.path}>
								<a
									className="text-lg tracking-wider text-site-4"
									onClick={() => setIsOpen(!isOpen)}
								>
									{item.title}
								</a>
							</Link>
						</div>
					))}
					<div className="pt-3">
						<button
							className="text-lg tracking-wider text-site-4"
							onClick={() => {
								doLogout();
								setIsOpen(!isOpen);
							}}
						>
							Kijelentkezés
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default MobileHeaderUser;
