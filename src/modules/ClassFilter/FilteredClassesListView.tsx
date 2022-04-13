import React, { useState, MouseEvent } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { Dialog } from '@headlessui/react';
import ClassDescription from '../../common/site/ClassDescription';
import { IoClose } from 'react-icons/io5';
import { ReservationType, SessionType } from '../../types';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import {
	useActions,
	useSelectedSession,
	useSiteStates,
	useToasts,
	useUser,
} from '../../hooks';
import Btn from '../../common/elements/buttons/Btn';
import { CategoryTypes, DifficultyTypes } from '../../types/ClassFilterTypes';
import DifficultyOne from '../../common/icons/difficulties/DifficultyOne';
import DifficultyTwo from '../../common/icons/difficulties/DifficultyTwo';
import DifficultyThree from '../../common/icons/difficulties/DifficultyThree';
import { useGetReservations } from '../../queries';
import ContentLoader from '../../common/elements/ContentLoader';

type PropTypes = {
	sessions: SessionType[];
};

function FilteredClassesListView({ sessions }: PropTypes) {
	const [onAttempt, setOnAttempt] = useState<boolean | number>(false);
	const { notify } = useToasts();
	const { status } = useUser();
	const { doResignReservation } = useActions();
	const { doShowLogin } = useSiteStates();
	const { reservations, isFetchingReservations, refetchReservations } =
		useGetReservations();
	const { selectedSessionDispatch } = useSelectedSession();
	const [showDescription, setShowDescription] = useState<
		SessionType | undefined
	>(undefined);

	const generateCategoryName = (cat: CategoryTypes) => {
		switch (cat) {
			case CategoryTypes.AMPLIFIER:
				return 'Erősítő';

			case CategoryTypes.CARDIO:
				return 'Cardio';

			case CategoryTypes.MOBILITY:
				return 'Mobilitás';

			default:
				break;
		}
	};

	const generateButton = (session: SessionType) => {
		const hasReservation: ReservationType | undefined = reservations.find(
			(reservation: ReservationType) => session?.id === reservation.session.id
		);

		if (isFetchingReservations) {
			return (
				<Btn
					text={
						<ContentLoader
							width="w-7"
							height="h-7"
							spinnerColor="border-white"
						/>
					}
					customClasses="w-full btn-dark flex justify-center"
					// @ts-ignore
					clickEvent={(e) => false}
				/>
			);
		}

		if (hasReservation) {
			return (
				<Btn
					text="Lemondás"
					customClasses="w-full btn-dark"
					// @ts-ignore
					clickEvent={(e) => resignReservation(e, hasReservation)}
				/>
			);
		} else {
			return (
				<Btn
					text="Foglalás"
					customClasses="w-full btn-dark"
					// @ts-ignore
					clickEvent={(e) => reservationClick(e, session)}
				/>
			);
		}
	};

	const resignReservation = async (
		e: MouseEvent,
		reservation: ReservationType
	) => {
		e.stopPropagation();

		setOnAttempt(reservation.session.id);

		const res = await doResignReservation(reservation.id);

		if (res.status) {
			notify('SUCCESS', res.message);
			refetchReservations();
		} else {
			notify('ERROR', res.message);
		}

		setOnAttempt(false);
	};

	const generateDifficulty = (diffType: DifficultyTypes) => {
		switch (diffType) {
			case DifficultyTypes.ADVENCED:
				return <DifficultyThree />;
				break;

			case DifficultyTypes.BEGINNER:
				return <DifficultyOne />;
				break;

			case DifficultyTypes.NORMAL:
				return <DifficultyTwo />;
				break;

			default:
				break;
		}
	};

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
						<div className="text-center py-20 text-xl h1-shadow h1-shadow--purple">
							Sajnos nincs találat!
						</div>
					) : (
						sessions.map((session) => {
							const start = format(new Date(session?.start), 'HH:mm');
							const end = format(new Date(session?.end), 'HH:mm');

							return (
								<div
									key={session.id}
									onClick={() => setShowDescription(session)}
									className="hover:bg-site-5 cursor-pointer relative"
								>
									<div className="container text-center md:text-left px-4 py-6 flex flex-col md:flex-row md:items-center md:gap-3">
										<div className="text-lg mb-1 md:mb-0 md:basis-2/12 md:text-xl">
											{start} - {end}
										</div>
										<div className="mb-1 md:mb-0 md:basis-1/12">
											<div className="inline-block text-white rounded-full w-12">
												{generateDifficulty(session.class.difficulty)}
											</div>
										</div>
										<div className="mb-2 md:mb-0 md:basis-5/12">
											<div className="text-site-4 text-2xl mb-2 ">
												{session.class.title}
											</div>

											<div className="flex flex-row flex-wrap justify-center items-center md:justify-start md:text-lg">
												<div>
													{generateCategoryName(session.class.category)}
												</div>
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
											{generateButton(session)}
										</div>
									</div>

									{onAttempt === session.id && (
										<div className="absolute inset-0 flex justify-center items-center bg-site-1 bg-opacity-60 rounded-xl">
											<ContentLoader />
										</div>
									)}
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
				<div className="flex items-center justify-center min-h-screen md:rounded-2xl">
					<Dialog.Overlay className="hidden md:block fixed inset-0 opacity-70 bg-white" />

					<div className="fixed inset-0 overflow-y-auto md:relative container md:bg-glow-purple  md:rounded-2xl">
						<div className="px-4 bg-site-8 py-3 md:rounded-tl-2xl md:rounded-tr-2xl ">
							<div className="relative ">
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
						<div className="bg-site-1 py-8 md:rounded-bl-2xl md:rounded-br-2xl">
							<div className="container">
								<ClassDescription
									session={showDescription}
									hideParentPopup={() => setShowDescription(undefined)}
								/>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}

export default FilteredClassesListView;
