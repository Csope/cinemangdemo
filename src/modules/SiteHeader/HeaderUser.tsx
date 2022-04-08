import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/solid';
import LoginSection from '../../common/site/LoginSection';
import { useSession } from 'next-auth/react';
import { useSiteStates, useUser } from '../../hooks';
import { Menu, Transition } from '@headlessui/react';
import { IoTriangle } from 'react-icons/io5';
import Link from 'next/link';
import * as Avatars from '../../common/icons/avatars/Avatars';
import LostPasswordSection from '../../common/site/LostPasswordSection';
import DefaultUserImage from '../../../public/images/avatars/bronze.png';

const MyLink = (props: any) => {
	let { href, children, ...rest } = props;
	return (
		<Link href={href}>
			<a
				{...rest}
				className={`block text-left text-site-4 hover:text-site-9 w-full`}
			>
				{children}
			</a>
		</Link>
	);
};

const HeaderUser = (): JSX.Element => {
	// const [showLogin, setShowLogin] = useState(false);
	const {
		showLogin,
		doShowLogin,
		doHideLogin,
		showLostPassword,
		doHideLostPassword,
	} = useSiteStates();
	const { status } = useSession();
	const { doSignOut, user } = useUser();

	const toggleLogin = () => {
		if (status === 'loading') return;

		if (status === 'unauthenticated') {
			doShowLogin();
		}
	};

	const doLogout = () => {
		doSignOut();
	};

	return (
		<>
			{status === 'authenticated' ? (
				<div className="nav-user__image">
					<Menu as="div" className="relative">
						{({ open }) => (
							<>
								<Menu.Button as="div" className="flex flex-col items-center">
									{user?.avatar ? (
										<img
											// @ts-ignore
											src={Avatars[user.avatar].src}
											className=" bg-glow-purple"
										/>
									) : (
										<div className="h-14 w-14 flex items-center justify-center bg-gray-200 border saturate-0 border-site-2 rounded-full cursor-pointer bg-glow-purple relative">
											<img src={DefaultUserImage.src} />
										</div>
									)}
									<div className="text-site-4 uppercase text-xs mt-2 cursor-pointer">
										{user?.first_name || 'Vendég'}
									</div>
								</Menu.Button>
								<Transition
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0"
									show={open}
								>
									<Menu.Items
										static
										className="absolute top-full right-0 bg-white rounded-xl py-3 px-4 z-40 outline-0"
									>
										<div
											className="absolute"
											style={{ bottom: 'calc(100% - 3px)', right: 18 }}
										>
											<IoTriangle fill="white" className=" text-xl" />
										</div>
										<Menu.Item>
											<MyLink href="/profile">Profilom</MyLink>
										</Menu.Item>
										<Menu.Item>
											<span
												onClick={doLogout}
												className={`block text-left pointer cursor-pointer text-site-4 hover:text-site-9`}
											>
												Kijelentkezés
											</span>
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</>
						)}
					</Menu>
				</div>
			) : (
				<div className="flex flex-col items-center" onClick={toggleLogin}>
					<div className="h-14 w-14 flex items-center justify-center saturate-0 bg-gray-200 border border-site-2 rounded-full cursor-pointer bg-glow-purple relative">
						<img src={DefaultUserImage.src} />
					</div>
					<div className="text-site-4 uppercase text-xs mt-2 cursor-pointer -tracking-tight">
						Bejelentkezés
					</div>
				</div>
			)}
			<LoginSection showLogin={showLogin} hideLogin={doHideLogin} />
			<LostPasswordSection
				showForm={showLostPassword}
				hideForm={doHideLostPassword}
			/>
		</>
	);
};

export default HeaderUser;
