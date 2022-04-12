import { Dialog } from '@headlessui/react';
import React, { MouseEvent, useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import Btn from '../../../common/elements/buttons/Btn';
import ContentLoader from '../../../common/elements/ContentLoader';
import { useActions, useSiteStates, useToasts } from '../../../hooks';
import SimpleLogo from '../../../../public/images/simple.png';
import { getHufFormat } from '../../../utils';
import DatePicker from 'react-datepicker';
import { addMonths, format } from 'date-fns';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { motion, MotionConfig } from 'framer-motion';
import { PassType } from '../../../types';

const PassPurchaseDialog = () => {
	const [startDate, setStartDate] = useState(null);
	const [startDateErr, setStartDateErr] = useState<null | string>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [onAttempt, setOnAttempt] = useState(false);
	const { selectedPass, doSetSelectedPass } = useSiteStates();
	const { doPurchasePass } = useActions();
	const { notify } = useToasts();
	const handleStartDateChange = (e: any) => {
		setIsOpen(!isOpen);
		setStartDate(e);
		setStartDateErr(null);
	};

	const handleStartDateClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	const passPurchaseClick = async (pass: PassType) => {
		if (!startDate) {
			setStartDateErr('Mező megadása kötelező');
			return false;
		} else {
			setStartDateErr(null);
		}

		const formattedDate = format(startDate, 'yyyy-MM-dd');

		setOnAttempt(true);
		const res = await doPurchasePass(pass, formattedDate);

		if (res.status && res.paymentUrl) {
			window.location.assign(res.paymentUrl);
		} else {
			setOnAttempt(false);
			notify('ERROR', res.message);
		}
	};

	useEffect(() => {
		if (!selectedPass) {
			setStartDate(null);
			setIsOpen(false);
			setStartDateErr(null);
		}
	}, [selectedPass]);

	return (
		<Dialog
			open={selectedPass ? true : false}
			onClose={() => doSetSelectedPass(null)}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					className="relative lg:w-6/12 h-screen overflow-y-auto md:h-auto bg-site-1 bg-glow-purple p-4 pt-10 md:p-8 md:pt-8 rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-3xl"
						onClick={() => doSetSelectedPass(null)}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-3">
						Vásárlás
					</h1>

					{false ? (
						<div className="flex items-center justify-center py-6">
							<ContentLoader />
						</div>
					) : (
						<>
							<div className="rounded-xl md:px-4 pt-3 pb-3 text-center mt-4 md:mr-8 mb-8 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12 ">
								<div className="mb-3">
									<div className="text-site-4 uppercase text-lg">
										Bérlet típusa
									</div>
									<div className="text-2xl font-medium">
										{selectedPass?.title}
									</div>
								</div>

								<div className="mb-4">
									<div className="text-lg">{selectedPass?.description}</div>
								</div>

								<div className="mb-8">
									<div className="text-site-4 uppercase text-lg mb-1">
										Érvényesség kezdete
									</div>
									<div className="text-2xl relative">
										<>
											<button
												className=" bg-transparent mx-auto flex justify-center items-center relative"
												onClick={handleStartDateClick}
												style={{ width: 130 }}
											>
												{startDate
													? format(startDate, 'yyyy-MM-dd')
													: 'válassz'}

												<FaRegCalendarAlt className="absolute left-full ml-2 mb-1 text-3xl text-site-4" />
											</button>
											{isOpen && (
												<div className="custom-datepicker z-20">
													<DatePicker
														selected={startDate}
														onChange={handleStartDateChange}
														inline
														minDate={new Date()}
														maxDate={addMonths(new Date(), 1)}
													/>
												</div>
											)}
										</>
									</div>
									{startDateErr && (
										<motion.div
											animate={{ y: 0 }}
											initial={{ y: 10 }}
											className="mt-2 text-rose-700"
										>
											{startDateErr}
										</motion.div>
									)}
								</div>

								<div className="mb-1">
									<Btn
										text={
											<>
												<FaShoppingCart className="mr-4" />{' '}
												<span className="normal-case">
													{getHufFormat(selectedPass?.price)}
												</span>
											</>
										}
										clickEvent={() =>
											passPurchaseClick(selectedPass as PassType)
										}
										customClasses="btn-dark w-full flex justify-center items-center"
									/>
								</div>

								<div className="mt-3">
									<div className="text-center text-sm mb-1">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Temporibus, vitae!
										<a
											className="text-site-4 underline ml-2"
											target={'_blank'}
											href="https://simplepartner.hu/PaymentService/Fizetesi_tajekoztato.pdf"
										>
											További információ
										</a>
									</div>
									<img
										src={SimpleLogo.src}
										className="mx-auto "
										style={{ maxWidth: 250 }}
									/>
								</div>
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

export default PassPurchaseDialog;
