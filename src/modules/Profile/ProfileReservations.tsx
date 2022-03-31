import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useToast } from 'react-toastify';
import Btn from '../../common/elements/buttons/Btn';
import ContentLoader from '../../common/elements/ContentLoader';
import ConfirmationPopup from '../../common/site/ConfirmationPopup';
import { useActions, useToasts, useUser } from '../../hooks';
import { useGetReservations } from '../../queries';

const ProfileReservations = () => {
	const [showConfirm, setShowConfirm] = useState<false | number>(false);
	const { status, user } = useUser();
	const { data, isFetching, refetch } = useGetReservations(user?.id as number);
	const reservations = data?.data.reservations || [];
	const [onAttempt, setOnAttempt] = useState(false);
	const { doResignReservation } = useActions();
	const { notify } = useToasts();

	const resignReservation = async (reservationId: number) => {
		setShowConfirm(false);
		setOnAttempt(true);
		const resignResponse = await doResignReservation(reservationId);
		setOnAttempt(false);

		if (resignResponse.status) {
			refetch();
			notify('SUCCESS', resignResponse.message);
		} else {
			notify('ERROR', resignResponse.message);
		}
	};

	console.log(reservations);

	return (
		<div className="bg-site-1 py-7 px-6 rounded-xl mb-8 relative">
			<h1 className="text-2xl text-center text-site-4 italic font-black uppercase mb-5">
				Foglalásaim
			</h1>

			{isFetching ? (
				<div className="flex items-center justify-center pt-4 pb-10">
					<ContentLoader />
				</div>
			) : reservations.length > 0 ? (
				<div className="grid grid-cols-2 gap-10">
					{reservations.map((reservation) => {
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
							<div className="bg-site-6 rounded-xl p-8" key={reservation.id}>
								<div className="grid grid-cols-2 mb-5">
									<div>
										<img
											src={`${
												process.env.NEXT_PUBLIC_ASSETS_ROUTE +
												reservation.session.class.preview_url
											}`}
											alt="class image"
											className="rounded-xl w-9/12"
										/>
									</div>
									<div className="text-center">
										<div className="mb-4">
											<div className="text-site-4 uppercase text-lg">
												Oktató
											</div>
											<div className="text-white text-2xl">
												{reservation.session.trainer.last_name}{' '}
												{reservation.session.trainer.first_name}
											</div>
										</div>
										<div className="mb-4">
											<div className="text-site-4 uppercase text-lg">Dátum</div>
											<div className="text-white text-2xl">{date}</div>
										</div>
										<div className="mb-4">
											<div className="text-site-4 uppercase text-lg">
												Időtartam
											</div>
											<div className="text-white text-2xl">
												{startHour}
												{' - '}
												{endHour}
											</div>
										</div>
										<div className="mb-4">
											<div className="text-site-4 uppercase text-lg">
												Helyszín
											</div>
											<div className="text-white text-2xl">
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
