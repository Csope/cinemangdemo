import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Btn from '../../../common/elements/buttons/Btn';
import ContentLoader from '../../../common/elements/ContentLoader';
import {
	useActions,
	useSelectedSession,
	useToasts,
	useUser,
} from '../../../hooks';
import { useCheckReservability, useGetReservations } from '../../../queries';
import { ReservabilityType, SessionType } from '../../../types';
import { FaShoppingCart, FaRegSmile } from 'react-icons/fa';
import Link from 'next/link';
import SimpleLogo from '../../../../public/images/simple.png';
import { getHufFormat, openUrl } from '../../../utils';

type PropTypes = {
	mobileApp?: boolean;
	updateSession: (id: number) => void;
};

const ReservationDialog = ({ mobileApp = false, updateSession }: PropTypes) => {
	const { notify } = useToasts();
	const popupContent = useRef(null);
	const [onAttempt, setOnAttempt] = useState<boolean>(false);
	const { refetchReservations } = useGetReservations();
	const [hasReservationResponse, setHasReservationResponse] =
		useState<boolean>(false);
	const [reservability, setReservability] = useState<
		ReservabilityType | undefined
	>(undefined);
	const { user } = useUser();
	const {
		doCreateReservation,
		doPurchaseTicket,
		doDisableScroll,
		doEnableScroll,
	} = useActions();
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

	const purchaseTicket = async (session: SessionType) => {
		setOnAttempt(true);

		const res = await doPurchaseTicket(session, mobileApp);

		if (res.status && res.paymentUrl) {
			if (mobileApp) {
				openUrl(res.paymentUrl);
			} else {
				window.location.assign(res.paymentUrl);
			}
		} else {
			setOnAttempt(false);
			notify('ERROR', res.message);
		}
	};

	const createReservation = async () => {
		if (selectedSession) {
			setOnAttempt(true);

			const res = await doCreateReservation(selectedSession?.id);

			setOnAttempt(false);

			if (res.status) {
				setHasReservationResponse(true);
				updateSession(selectedSession.id);
				refetchReservations();
			} else {
				notify('ERROR', res.message);
			}
		}
	};

	const renderButtons = () => {
		if (!reservability) return null;

		if (hasReservationResponse) {
			return (
				<div className="bg-site-22 mx-4 md:mx-0 py-6 text-white flex justify-center items-center flex-col rounded-br-xl rounded-bl-xl rounded-tr-xl md:rounded-tr-none rounded-tl-xl md:rounded-tl-none">
					<div className="text-5xl mb-3">
						<FaRegSmile />
					</div>
					<div className="text-xl">Sikeres foglal??s!</div>
				</div>
			);
		}

		if (reservability.session_full) {
			return (
				<div className="pb-8">
					<div>
						Sajn??ljuk, erre az ??r??ra online foglal??s/v??s??rl??s m??r nem lehets??ges
					</div>
				</div>
			);
		}

		if (reservability.has_reservation) {
			return (
				<div className="pb-8">
					<div>M??r van ??l?? foglal??sod az ??r??ra</div>
				</div>
			);
		}

		return (
			<div className="px-4 md:pb-10 md:px-8">
				<div className="mb-2">
					<Btn
						clickEvent={() => purchaseTicket(selectedSession as SessionType)}
						text={
							<>
								<FaShoppingCart className="mr-4" />{' '}
								<span className="">{getHufFormat(reservability.price)}</span>
							</>
						}
						customClasses="bg-site-23 text-white w-full flex justify-center items-center"
					/>
				</div>
				<div>
					<div className="text-center text-sm mb-1">
						A "V??s??rl??s" gombra kattintva elhagyod a Sug??r Fitness weboldal??t ??s
						??tir??ny??tunk az OTP SimplePay biztons??gos fizet?? fel??let??re.
						<a
							className="text-site-4 underline ml-2"
							target={'_blank'}
							rel="noreferrer"
							href="https://simplepartner.hu/PaymentService/Fizetesi_tajekoztato.pdf"
						>
							"Tov??bbi inform??ci??"
						</a>
					</div>
					<img
						src={SimpleLogo.src}
						className="mx-auto mb-4"
						style={{ maxWidth: 250 }}
					/>
				</div>
				{reservability.missing_pass ? (
					<div>
						<Btn
							clickEvent={(e) => e.preventDefault()}
							text="Foglal??s b??rlettel"
							customClasses="btn-gray-2 w-full"
							disabled
						/>
						<div className="mt-1">
							Nincs ??rv??nyes b??rleted.{' '}
							<Link href="/prices">
								<a className="text-site-19 underline">B??rlet v??s??rl??s</a>
							</Link>
						</div>
					</div>
				) : (
					<div>
						<Btn
							clickEvent={createReservation}
							text="Foglal??s b??rlettel"
							customClasses="btn-dark w-full"
						/>
					</div>
				)}
			</div>
		);
	};

	useEffect(() => {
		if (data && data?.data?.reservability) {
			setReservability(data.data.reservability);
		} else {
			setReservability(undefined);
		}
	}, [data]);

	/**
	 * Clean up
	 */
	useEffect(() => {
		if (!selectedSession) {
			setOnAttempt(false);
			setHasReservationResponse(false);
			doEnableScroll();
		} else {
			if (popupContent.current) {
				doDisableScroll(popupContent.current);
			}
		}
	}, [selectedSession]);

	if (!selectedSession) {
		return null;
	}

	return (
		<Dialog
			open={selectedSession ? true : false}
			onClose={clearSelectedSession}
			className="fixed z-30 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen  relative">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					ref={popupContent}
					className="mobile-popup relative lg:w-6/12 h-screen overflow-y-auto md:h-auto md:w-auto w-full bg-site-1 bg-glow-purple md:rounded-xl pt-8 pb-8 md:pb-0"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-3xl"
						onClick={clearSelectedSession}
					>
						<AiFillCloseCircle />
					</div>

					<h1
						className={`text-center h1-shadow h1-shadow--purple text-2xl md:text-3xl mb-3 ${
							mobileApp ? 'hidden' : 'block'
						}`}
					>
						Foglal??s
					</h1>

					{isLoading ? (
						<div className="flex items-center justify-center pt-6 pb-10">
							<ContentLoader />
						</div>
					) : (
						<>
							<div className="rounded-xl pt-3 text-center mt-4 md:mr-8 mb-8 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12 ">
								<div className="mb-4">
									<div className="text-site-4 uppercase md:text-lg">Oktat??</div>
									<div className="text-xl md:text-2xl">
										{selectedSession?.trainer.last_name}{' '}
										{selectedSession?.trainer.first_name}
									</div>
								</div>

								<div className="mb-4">
									<div className="text-site-4 uppercase md:text-lg">D??tum</div>
									<div className="text-xl md:text-2xl">
										{selectedSession?.date &&
											format(new Date(selectedSession?.date), 'yyyy-MM-dd')}
									</div>
								</div>

								<div className="mb-4">
									<div className="text-site-4 uppercase md:text-lg">
										Id??tartam
									</div>
									<div className="text-xl md:text-2xl">
										{selectedSession?.start &&
											format(new Date(selectedSession?.start), 'HH:mm')}{' '}
										-{' '}
										{selectedSession?.end &&
											format(new Date(selectedSession?.end), 'HH:mm')}
									</div>
								</div>

								<div className="mb-4">
									<div className="text-site-4 uppercase md:text-lg">
										Helysz??n
									</div>
									<div className="text-xl md:text-2xl">
										{selectedSession?.location.title}
									</div>
								</div>

								<div className="mb-6">
									<div className="text-site-4 uppercase md:text-lg">
										Foglalts??g
									</div>
									<div className="text-xl md:text-2xl">
										{selectedSession?.current_headcount}/
										{selectedSession?.max_headcount}
									</div>
								</div>

								{reservability && renderButtons()}
							</div>
						</>
					)}
					{onAttempt && (
						<div className="absolute inset-0 bg-site-1 bg-opacity-70 flex items-center justify-center py-6">
							<ContentLoader />
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default ReservationDialog;
