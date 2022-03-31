import { Menu, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useUser, useSiteStates } from '../../hooks';
import { UserIcon } from '@heroicons/react/solid';
import { IoTriangle } from 'react-icons/io5';
import Link from 'next/link';
import * as Avatars from '../../common/icons/avatars/Avatars';

const MobileHeaderUser = () => {
	const { doSignOut, user } = useUser();
	const { showLogin, doShowLogin, doHideLogin } = useSiteStates();
	const { status } = useSession();

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
		<div className="md:hidden">
			{status === 'authenticated' ? (
				<div className="nav-user__image">
					<Menu as="div" className="relative">
						<Menu.Button as="div">
							{user?.avatar ? (
								<img
									// @ts-ignore
									src={Avatars[user.avatar].src}
									className=" bg-glow-purple"
								/>
							) : (
								<div className="h-10 w-10 bg-gray-200 border border-site-2 rounded-full cursor-pointer bg-glow-purple relative">
									<UserIcon className="p-2 text-site-4" />
								</div>
							)}
						</Menu.Button>
						<Transition
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Menu.Items className="absolute top-full right-0 bg-white rounded-xl py-3 px-4 z-40 outline-0">
								<div
									className="absolute"
									style={{ bottom: 'calc(100% - 3px)', right: 28 }}
								>
									<IoTriangle fill="white" className=" text-xl" />
								</div>
								<Menu.Item>
									<Link href="/profile">
										<a
											className={`block text-left text-site-4 hover:text-site-9`}
										>
											Profilom
										</a>
									</Link>
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
					</Menu>
				</div>
			) : (
				<div
					onClick={toggleLogin}
					className="h-10 w-10 bg-gray-200 border border-site-2 rounded-full cursor-pointer bg-glow-purple relative"
				>
					<UserIcon className="p-2 text-site-4" />
				</div>
			)}
		</div>
	);
};

export default MobileHeaderUser;
