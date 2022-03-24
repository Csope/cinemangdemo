import React, { useState, MouseEvent } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { Dialog } from '@headlessui/react';
import ClassDescription from '../../common/site/ClassDescription';
import { IoClose } from 'react-icons/io5';
import { SessionType } from '../../types';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useSelectedSession, useSiteStates, useUser } from '../../hooks';
import Btn from '../../common/elements/buttons/Btn';

type PropTypes = {
	sessions: SessionType[];
};

function FilteredClassesListView({ sessions }: PropTypes) {
	const { status } = useUser();
	const { doShowLogin } = useSiteStates();
	const { selectedSessionDispatch } = useSelectedSession();
	const [showDescription, setShowDescription] = useState<
		SessionType | undefined
	>(undefined);
	const router = useRouter();

	const reservationClick = (e: MouseEvent, session: SessionType) => {
		e.stopPropagation();

		if (status === 'loading') return;

		if (status === 'unauthenticated') {
			doShowLogin();
			return;
		}

		selectedSessionDispatch({ type: 'SET_SELECTED', payload: session });
	};

	return (
		<>
			<div className="FilteredClassesListView bg-white">
				<div className="divide-y divide-site-2 border-t border-b border-site-2 ">
					{isEmpty(sessions) ? (
						<div className="text-center my-20">
							Nincs találat TODO: new message
						</div>
					) : (
						sessions.map((session) => {
							const start = format(new Date(session?.start), 'HH:mm');
							const end = format(new Date(session?.end), 'HH:mm');

							return (
								<div
									key={session.id}
									onClick={() => setShowDescription(session)}
									className="hover:bg-site-5 cursor-pointer"
								>
									<div className="container text-center md:text-left px-4 py-6 flex flex-col md:flex-row md:items-center md:gap-3">
										<div className="text-lg mb-1 md:mb-0 md:basis-2/12 md:text-xl">
											{start} - {end}
										</div>
										<div className="mb-1 md:mb-0 md:basis-1/12">
											<div className="inline-block bg-rose-500 text-white rounded-full">
												<FiAlertCircle className="mx-auto w-10 h-10" />
											</div>
										</div>
										<div className="mb-2 md:mb-0 md:basis-5/12">
											<div className="text-site-4 text-2xl mb-2 ">
												{session.class.title}
											</div>

											<div className="flex flex-row flex-wrap justify-center items-center md:justify-start md:text-lg">
												<div>Cardio</div>
												<div>
													<BsDot />
												</div>
												<div>{session.location.title}</div>
												<div>
													<BsDot />
												</div>
												<div>
													{session.trainer.last_name}{' '}
													{session.trainer.first_name}
												</div>
											</div>
										</div>
										<div className="text-lg mb-4 md:mb-0 md:basis-2/12 md:text-right md:text-xl lg:mr-4">
											Még {session.max_headcount - session.current_headcount}{' '}
											hely
										</div>
										<div className="md:basis-2/12 md:text-right">
											<Btn
												text="Foglalás"
												customClasses="btn-dark"
												clickEvent={(e) => reservationClick(e, session)}
											/>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
			<Dialog
				open={showDescription ? true : false}
				onClose={() => setShowDescription(undefined)}
				className="fixed z-10 inset-0 overflow-y-auto"
			>
				<div className="flex items-center justify-center min-h-screen">
					<Dialog.Overlay
						className="fixed inset-0 opacity-60"
						style={{ backgroundColor: '#280935' }}
					/>

					<div className="relative w-full">
						<div className="px-4 bg-site-8 py-3">
							<div className="container relative">
								<h1 className="h1-shadow h1-shadow--white text-center ">
									{showDescription?.class.title}
								</h1>
								<div
									onClick={() => setShowDescription(undefined)}
									className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-site-4 text-white p-2 cursor-pointer text-lg"
								>
									<IoClose />
								</div>
							</div>
						</div>
						<div className="bg-site-1 py-8">
							<div className="container">
								<ClassDescription session={showDescription} />
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}

export default FilteredClassesListView;
