import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaRegSmile } from 'react-icons/fa';
import { useSiteStates } from '../../../hooks';
import { SessionType } from '../../../types';
import { HiOutlineEmojiSad } from 'react-icons/hi';

const ReservationResponse = () => {
	const { reservationPurchaseInProgress, doHideReservationPurchaseResponse } =
		useSiteStates();

	const hidePopup = () => {
		doHideReservationPurchaseResponse();
	};

	if (!reservationPurchaseInProgress) {
		return null;
	}

	const session: SessionType =
		// @ts-ignore
		reservationPurchaseInProgress.request.page_data?.session;

	return (
		<Dialog
			open={reservationPurchaseInProgress ? true : false}
			onClose={hidePopup}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen  relative">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					className="relative h-screen overflow-y-auto md:h-auto md:w-auto w-full lg:w-6/12 bg-site-1 bg-glow-purple md:rounded-xl pt-8"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-3xl"
						onClick={hidePopup}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-3">
						Vásárlás
					</h1>

					<div className="rounded-xl pt-3 text-center mt-4 md:mr-8 mb-8 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12 ">
						<div className="mb-4">
							<div className="text-site-4 uppercase text-lg">
								Tranzakció azonosító
							</div>
							<div className="text-2xl">
								{
									reservationPurchaseInProgress?.purchase_details
										?.transaction_number
								}
							</div>
						</div>
						<div className="mb-4">
							<div className="text-site-4 uppercase text-lg">Oktató</div>
							<div className="text-2xl">
								{session?.trainer.last_name} {session?.trainer.first_name}
							</div>
						</div>

						<div className="mb-4">
							<div className="text-site-4 uppercase text-lg">Dátum</div>
							<div className="text-2xl">
								{session?.date && format(new Date(session?.date), 'yyyy-MM-dd')}
							</div>
						</div>

						<div className="mb-4">
							<div className="text-site-4 uppercase text-lg">Időtartam</div>
							<div className="text-2xl">
								{session?.start && format(new Date(session?.start), 'HH:mm')} -{' '}
								{session?.end && format(new Date(session?.end), 'HH:mm')}
							</div>
						</div>

						<div className="mb-4">
							<div className="text-site-4 uppercase text-lg">Helyszín</div>
							<div className="text-2xl">{session?.location.title}</div>
						</div>

						{reservationPurchaseInProgress.status === 'COMPLETED' && (
							<div className="bg-site-22 py-6 text-white flex justify-center items-center flex-col rounded-br-xl rounded-bl-xl rounded-tr-xl md:rounded-tr-none rounded-tl-xl md:rounded-tl-none mx-4 md:mx-0">
								<div className="text-5xl mb-3">
									<FaRegSmile />
								</div>
								<div className="text-xl">Sikeres vásárlás!</div>
							</div>
						)}

						{reservationPurchaseInProgress.status === 'FAILED' && (
							<div className=" bg-red-500 py-6 text-white flex justify-center items-center flex-col rounded-br-xl rounded-bl-xl rounded-tr-xl md:rounded-tr-none rounded-tl-xl md:rounded-tl-none mx-4 md:mx-0">
								<div className="text-5xl mb-3">
									<HiOutlineEmojiSad />
								</div>
								<div className="text-xl">Sikertelen vásárlás!</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default ReservationResponse;
