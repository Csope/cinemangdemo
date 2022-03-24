import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Btn from '../../../common/elements/buttons/Btn';
import ContentLoader from '../../../common/elements/ContentLoader';
import { useActions, useSelectedSession, useUser } from '../../../hooks';
import { useCheckReservability } from '../../../queries';
import { ReservabilityType } from '../../../types';

const ReservationDialog = () => {
	const [reservability, setReservability] = useState<
		ReservabilityType | undefined
	>(undefined);
	const { user } = useUser();
	const { doCreateReservation } = useActions();
	const {
		selectedSessionDispatch,
		selectedSessionState: { selectedSession },
	} = useSelectedSession();
	const { isLoading, data } = useCheckReservability(
		user?.id,
		selectedSession?.id
	);

	const clearSelectedSession = () => {
		selectedSessionDispatch({ type: 'SET_SELECTED', payload: null });
	};

	const buyTicket = () => {
		console.log('buy ticket');
	};

	const createReservation = async () => {
		if (selectedSession) {
			const res = await doCreateReservation(selectedSession?.id);
		}
	};

	const renderButtons = () => {
		if (!reservability) return null;

		if (reservability.session_full) {
			return (
				<div>
					<div>Session is full</div>
				</div>
			);
		}

		if (reservability.has_reservation) {
			return (
				<div>
					<div>You already have reservation</div>
				</div>
			);
		}

		return (
			<>
				<div className="mb-4">
					<Btn
						clickEvent={buyTicket}
						text="Jegyvásárlás"
						customClasses="btn-dark w-full"
						appendAfter={
							<div className="absolute top-1/2 -translate-y-1/2 right-4">
								Simple
							</div>
						}
					/>
				</div>
				{reservability.missing_pass ? (
					<div>Berlet vasarlas</div>
				) : (
					<div>
						<Btn
							clickEvent={createReservation}
							text="Foglalás bérlettel"
							customClasses="btn-gray-2 w-full"
						/>
					</div>
				)}
			</>
		);
	};

	useEffect(() => {
		if (data && data?.data?.reservability) {
			setReservability(data.data.reservability);
		} else {
			setReservability(undefined);
		}
	}, [data]);

	if (!selectedSession) {
		return null;
	}

	return (
		<Dialog
			open={selectedSession ? true : false}
			onClose={clearSelectedSession}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					className="relative lg:w-6/12 bg-site-1 bg-glow-purple p-8 rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-3xl"
						onClick={clearSelectedSession}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-3">
						Foglalás
					</h1>

					{isLoading ? (
						<div className="flex items-center justify-center py-6">
							<ContentLoader />
						</div>
					) : (
						<>
							<div className="rounded-xl px-4 pt-3 pb-3 text-center mt-4 md:mr-8 mb-8 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12 ">
								<div className="mb-4">
									<div className="text-site-4 uppercase text-lg">Oktató</div>
									<div className="text-2xl">
										{selectedSession?.trainer.last_name}{' '}
										{selectedSession?.trainer.first_name}
									</div>
								</div>

								<div className="mb-4">
									<div className="text-site-4 uppercase text-lg">Dátum</div>
									<div className="text-2xl">
										{selectedSession?.date &&
											format(new Date(selectedSession?.date), 'yyyy-MM-dd')}
									</div>
								</div>

								<div className="mb-4">
									<div className="text-site-4 uppercase text-lg">Időtartam</div>
									<div className="text-2xl">
										{selectedSession?.start &&
											format(new Date(selectedSession?.start), 'HH:mm')}{' '}
										-{' '}
										{selectedSession?.end &&
											format(new Date(selectedSession?.end), 'HH:mm')}
									</div>
								</div>

								<div className="mb-4">
									<div className="text-site-4 uppercase text-lg">Helyszín</div>
									<div className="text-2xl">
										{selectedSession?.location.title}
									</div>
								</div>

								<div className="mb-6">
									<div className="text-site-4 uppercase text-lg">
										Férőhelyek
									</div>
									<div className="text-2xl">
										{selectedSession?.current_headcount}/
										{selectedSession?.max_headcount}
									</div>
								</div>

								{reservability && renderButtons()}
							</div>
						</>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default ReservationDialog;
