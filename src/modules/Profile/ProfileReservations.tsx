import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useToast } from 'react-toastify';
import Btn from '../../common/elements/buttons/Btn';
import ContentLoader from '../../common/elements/ContentLoader';
import ConfirmationPopup from '../../common/site/ConfirmationPopup';
import { useActions, useToasts, useUser } from '../../hooks';
import { useGetOwnedPasses, useGetReservations } from '../../queries';
import { ReservationType } from '../../types';
import DefaultClassImage from '../../../public/images/defaults/oratipus_default.jpg';

const ProfileReservations = () => {
	const [showConfirm, setShowConfirm] = useState<false | number>(false);
	const { reservations, isFetchingReservations, refetchReservations } =
		useGetReservations();
	const ownedPasses = useGetOwnedPasses();
	const [onAttempt, setOnAttempt] = useState(false);
	const { doResignReservation } = useActions();
	const { notify } = useToasts();

	const resignReservation = async (reservationId: number) => {
		setShowConfirm(false);
		setOnAttempt(true);
		const resignResponse = await doResignReservation(reservationId);
		setOnAttempt(false);

		if (resignResponse.status) {
			refetchReservations();
			ownedPasses.refetch();
			notify('SUCCESS', resignResponse.message);
		} else {
			notify('ERROR', resignResponse.message);
		}
	};

	return (
		<div className="bg-site-1 py-7 px-4 md:px-6 rounded-xl mb-8 relative">
			<h1 className="text-xl md:text-2xl font-montserrat text-center text-site-4 italic font-black uppercase mb-5">
				Foglalásaim
			</h1>

			{isFetchingReservations ? (
				<div className="flex items-center justify-center pt-4 pb-10">
					<ContentLoader />
				</div>
			) : reservations.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{reservations.map((reservation: ReservationType, i) => {
						const startHour = format(
							new Date(reservation.session.start),
							'HH:mm'
						);
						const endHour = format(new Date(reservation.session.end), 'HH:mm');
						const date = format(
							new Date(reservation.session.date),
							'yyyy-MM-dd'
						);

						return (
							<div
								className="bg-site-6 rounded-xl p-8 pt-12 relative"
								key={reservation.id}
							>
								<div className="absolute top-4 left-4 rounded-full bg-site-8 text-sm w-7 h-7 flex justify-center items-center text-site-4">
									{i + 1}
								</div>
								<div className="grid grid-cols-1 gap-10 md:gap-0 md:grid-cols-2 mb-5">
									<div className="pt-3">
										<img
											src={`${
												!reservation.session.class.preview_url
													? reservation.session.class.preview_url
													: DefaultClassImage.src
											}`}
											alt="class image"
											className="rounded-xl w-9/12 mx-auto"
										/>
									</div>
									<div className="text-center">
										<div className="mb-4">
											<div className="text-site-4 uppercase md:text-lg">
												Oktató
											</div>
											<div className="text-white text-xl md:text-2xl">
												{reservation.session.trainer.last_name}{' '}
												{reservation.session.trainer.first_name}
											</div>
										</div>
										<div className="mb-4">
											<div className="text-site-4 uppercase md:text-lg">
												Dátum
											</div>
											<div className="text-white text-xl md:text-2xl">
												{date}
											</div>
										</div>
										<div className="mb-4">
											<div className="text-site-4 uppercase md:text-lg">
												Időtartam
											</div>
											<div className="text-white text-xl md:text-2xl">
												{startHour}
												{' - '}
												{endHour}
											</div>
										</div>
										<div className="mb-4">
											<div className="text-site-4 uppercase md:text-lg">
												Helyszín
											</div>
											<div className="text-white text-xl md:text-2xl">
												{reservation.session.location.title}
											</div>
										</div>
									</div>
								</div>
								<div>
									<Btn
										clickEvent={() => setShowConfirm(reservation.id)}
										text="Lemondás"
										customClasses="bg-site-4 text-white w-full"
									/>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="text-center">Jelenleg nincs foglalásom!</div>
			)}

			<ConfirmationPopup
				show={showConfirm ? true : false}
				cancelAction={() => setShowConfirm(false)}
				confirmAction={() => resignReservation(showConfirm as number)}
				title="Megerősítés"
				text="Biztos, hogy le szeretnéd mondani a foglalásod?"
				cancelText="Mégsem"
				confirmText="Lemondás"
			/>

			{onAttempt && (
				<div className="absolute inset-0 flex justify-center items-center bg-site-1 rounded-xl bg-opacity-70">
					<ContentLoader />
				</div>
			)}
		</div>
	);
};

export default ProfileReservations;
