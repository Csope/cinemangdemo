import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ContentLoader from '../../common/elements/ContentLoader';
import { useUser } from '../../hooks';
import { useGetReservations } from '../../queries';

const ProfileReservations = () => {
	const { status, user } = useUser();
	const { data, isFetching } = useGetReservations(user?.id as number);
	const reservations = data?.data.reservations || [];
	const [onAttempt, setOnAttempt] = useState(false);

	return (
		<div className="bg-site-1 py-7 px-6 rounded-xl mb-8">
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
							new Date(reservation.details.session.start),
							'HH:mm'
						);
						const endHour = format(
							new Date(reservation.details.session.end),
							'HH:mm'
						);
						const date = format(
							new Date(reservation.details.session.date),
							'yyyy-MM-dd'
						);

						return (
							<div className="bg-site-6 rounded-xl p-8" key={reservation.id}>
								<div className="grid grid-cols-2 mb-5">
									<div>
										<img
											src="https://geocdn.fotex.net/static.sugarfitness.hu/files/996/preview.jpg"
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
												{reservation.details.trainer.last_name}{' '}
												{reservation.details.trainer.first_name}
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
												{reservation.details.location.title}
											</div>
										</div>
										{/* <div className="mb-4">
												<div className="text-site-4 uppercase text-lg">
													Férőhelyek
												</div>
												<div className="text-white text-2xl">
													{reservation.details}
												</div>
											</div> */}
									</div>
								</div>
								<div>
									<motion.button
										whileTap={{ scale: 0.95 }}
										disabled={onAttempt}
										type="submit"
										className={` transition-colors bg-site-4 text-white relative cursor-pointer uppercase text-center w-full block px-7 py-2 rounded-3xl font-bold tracking-widest  ${
											onAttempt ? ' opacity-60 ' : ' opacity-100'
										}`}
									>
										Lemondás
									</motion.button>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="text-center">Jelenleg nincs foglalásom!</div>
			)}
		</div>
	);
};

export default ProfileReservations;
