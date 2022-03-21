import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import ContentLoader from '../../../common/elements/ContentLoader';
import { useSelectedSession } from '../../../hooks';

const ReservationDialog = () => {
	const [initLoading, setInitLoading] = useState<boolean>(true);

	const {
		selectedSessionDispatch,
		selectedSessionState: { selectedSession },
	} = useSelectedSession();

	const clearSelectedSession = () => {
		selectedSessionDispatch({ type: 'SET_SELECTED', payload: null });
	};

	const buyTicket = () => {
		console.log('buy ticket');
	};

	const makeReservation = () => {
		console.log('make reservation');
	};

	useEffect(() => {
		if (selectedSession !== null) {
			setTimeout(() => {
				setInitLoading(false);
			}, 3000);
		} else {
			setInitLoading(true);
		}
	}, [selectedSession]);

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
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-2xl"
						onClick={clearSelectedSession}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-3">
						Foglalás
					</h1>

					{initLoading ? (
						<div className="flex items-center justify-center py-6">
							<ContentLoader />
						</div>
					) : (
						<>
							<div className="text-center">
								<div className="text-lg">
									{selectedSession?.trainer.last_name}{' '}
									{selectedSession?.trainer.first_name}
								</div>

								<div className="text-2xl text-site-4 mb-2 font-bold">
									{selectedSession?.class.title}
								</div>

								<div className="text-xl text-site-4 mb-2">
									{selectedSession.current_headcount} /{' '}
									{selectedSession.max_headcount}
								</div>

								<div>{selectedSession?.date}</div>

								<div className="text-xl text-site-4 mb-6 font-bold">
									{format(new Date(selectedSession?.start), 'HH:mm')}
									{' - '}
									{format(new Date(selectedSession?.end), 'HH:mm')}
								</div>
							</div>

							<div className="mb-4">
								<motion.button
									onClick={buyTicket}
									whileTap={{ scale: 0.95 }}
									className={` transition-colors bg-site-4 text-white relative cursor-pointer uppercase text-center w-full block px-8 py-3 rounded-3xl font-bold tracking-widest`}
								>
									Jegyvásárlás
								</motion.button>
							</div>

							<div>
								<motion.button
									onClick={makeReservation}
									whileTap={{ scale: 0.95 }}
									className={` transition-colors bg-site-4 text-white relative cursor-pointer uppercase text-center w-full block px-8 py-3 rounded-3xl font-bold tracking-widest`}
								>
									Foglalás bérlettel
								</motion.button>
							</div>
						</>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default ReservationDialog;
