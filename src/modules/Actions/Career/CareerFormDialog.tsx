import { Dialog, Switch } from '@headlessui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import Btn from '../../../common/elements/buttons/Btn';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import ContentLoader from '../../../common/elements/ContentLoader';
import { useSiteStates, useToasts } from '../../../hooks';
import { ResType } from '../../../types';

type FormValues = {
	email: string;
	name: string;
};

const classesData = [
	{ id: '0', name: 'Alakformáló' },
	{ id: '1', name: 'BodyArt' },
	{ id: '2', name: 'Box' },
	{ id: '3', name: 'Callanetics' },
	{ id: '4', name: 'Core Training' },
	{ id: '5', name: 'Cross Training' },
	{ id: '6', name: 'DeepWork' },
	{ id: '7', name: 'FitBox' },
	{ id: '8', name: 'FitFight' },
	{ id: '9', name: 'Funkcionális Köredzés' },
	{ id: '10', name: 'Gerinctréning' },
	{ id: '11', name: 'HardCore' },
	{ id: '12', name: 'Interval Mix' },
	{ id: '13', name: 'Jóga' },
	{ id: '14', name: 'Jump' },
	{ id: '15', name: 'Kangoo' },
	{ id: '16', name: 'Kettlebell' },
	{ id: '17', name: 'Pilates' },
	{ id: '18', name: 'Salsa Fitness' },
	{ id: '19', name: 'Senior Torna' },
	{ id: '20', name: 'Spinning' },
	{ id: '21', name: 'Step' },
	{ id: '22', name: 'Stretching' },
	{ id: '23', name: 'TRX' },
	{ id: '24', name: 'Zumba' },
	{ id: '25', name: 'Egyéb' },
];

const CareerFormDialog = () => {
	const [onAttempt, setOnAttempt] = useState(false);
	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
	const [selectedClassesError, setSelectedClassesError] = useState<
		string | null
	>(null);
	const { showCareerForm, doHideCareerForm } = useSiteStates();
	const { notify } = useToasts();
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			email: '',
			name: '',
		},
	});

	const onSubmit = async () => {
		let flag = true;

		if (!isValidPhoneNumber(phone)) {
			setPhoneError('Hibás formátum');
			flag = false;
		} else {
			setPhoneError(null);
		}

		if (selectedClasses.length < 1) {
			setSelectedClassesError('Legalább 1 óratípust kötelező választani');
			flag = false;
		} else {
			setSelectedClassesError(null);
		}

		if (!flag) return;

		const email = getValues('email');
		const name = getValues('name');

		setOnAttempt(true);

		try {
			const { data } = await axios.post<ResType<any>>(
				`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/applicants`,
				{
					email,
					name,
					phone,
					classes: selectedClasses,
				}
			);

			if (data.status) {
				notify('SUCCESS', data.message || '');
			} else {
				notify('ERROR', data.message || '');
			}
		} catch (error) {
			notify('ERROR', 'Belső kiszolgálóhiba, próbáld újra később');
		}

		setOnAttempt(false);
	};

	const selectedClassChange = (className: string) => {
		if (selectedClasses.includes(className)) {
			const newSelectedClasses = selectedClasses.filter((c) => c !== className);
			setSelectedClasses(newSelectedClasses);
		} else {
			setSelectedClasses((old) => [...old, className]);
		}
	};

	useEffect(() => {
		if (!showCareerForm) {
			setSelectedClasses([]);
			setPhoneError(null);
			setPhone('');
			setSelectedClasses([]);
			setSelectedClassesError(null);
			reset();
		}
	}, [showCareerForm]);

	return (
		<Dialog
			open={showCareerForm ? true : false}
			onClose={() => doHideCareerForm()}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen overflow-y-auto">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					className="relative h-screen overflow-y-auto md:h-auto lg:w-6/12 bg-site-1 bg-glow-purple px-4 md:px-8 py-8 md:rounded-xl"
					style={{ maxWidth: 800 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-2xl"
						onClick={doHideCareerForm}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-3">
						Jelentkezés
					</h1>

					<div>
						<div className="md:p-4">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-5">
									<label htmlFor="name" className="ml-1 mb-1 block">
										Név*
									</label>
									<input
										id="name"
										type="text"
										className="white-input"
										{...register('name', {
											required: 'Mező megadása kötelező',
										})}
									/>
									{errors.name && (
										<motion.div
											className="mt-2 text-rose-700"
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
										>
											{errors.name.message}
										</motion.div>
									)}
								</div>

								<div className="mb-5">
									<label htmlFor="email" className="ml-1 mb-1 block">
										E-mail cím*
									</label>
									<input
										id="email"
										type="email"
										className="white-input"
										{...register('email', {
											required: 'Mező megadása kötelező',
										})}
									/>
									{errors.email && (
										<motion.div
											className="mt-2 text-rose-700"
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
										>
											{errors.email.message}
										</motion.div>
									)}
								</div>

								<div className="mb-5">
									<label htmlFor="phone" className="ml-1 mb-1 block">
										Telefonszám*
									</label>
									<div className="pl-2">
										<PhoneInput
											placeholder="Enter phone number"
											value={phone}
											// @ts-ignore
											onChange={setPhone}
											international
											defaultCountry="HU"
										/>
									</div>

									{phoneError && (
										<motion.div
											className="mt-2 text-rose-700 ml-2"
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
										>
											{phoneError}
										</motion.div>
									)}
								</div>

								<div className="ml-1 mb-7">
									Kérjük válaszd ki mely órák megtartásához van végzettséged
									{selectedClassesError && (
										<motion.div
											className="mt-2 text-rose-700"
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
										>
											{selectedClassesError}
										</motion.div>
									)}
								</div>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5">
									{classesData.map((_class) => (
										<div className="flex flex-row" key={_class.id}>
											<Switch
												checked={selectedClasses.includes(_class.name)}
												onChange={() => selectedClassChange(_class.name)}
												className={`${
													selectedClasses.includes(_class.name)
														? 'bg-site-3'
														: 'bg-white'
												}  h-4 w-4 rounded border-white border-2`}
											/>
											<div
												className="ml-2 cursor-pointer"
												onClick={() => selectedClassChange(_class.name)}
											>
												{_class.name}
											</div>
										</div>
									))}
								</div>

								<div>
									<Btn
										text="Kérem keressenek"
										customClasses="btn-dark w-full"
										clickEvent={() => null}
									/>
								</div>
							</form>
						</div>
					</div>

					{onAttempt && (
						<div className="absolute inset-0 bg-site-1 bg-opacity-70 flex items-center justify-center py-6 rounded-xl">
							<ContentLoader />
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default CareerFormDialog;
