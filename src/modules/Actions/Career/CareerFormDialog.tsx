import { Dialog, Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import Btn from '../../../common/elements/buttons/Btn';

import ContentLoader from '../../../common/elements/ContentLoader';
import { useSiteStates, useToasts } from '../../../hooks';

type FormValues = {
	email: string;
	name: string;
	phone: string;
};

const classesData = [
	'Alakformáló',
	'BodyArt',
	'Box',
	'Callanetics',
	'Core Training',
	'Cross Training',
	'DeepWork',
	'FitBox',
	'Gerinctréning',
	'HardCore',
	'Interval Mix',
	'Jóga',
	'Jump',
	'Kangoo',
	'Kettlebell',
	'Pilates',
	'Salsa Fitness',
	'Senior Torna',
	'Spinning',
	'Step',
	'Stretching',
	'TRX',
	'Zumba',
	'Egyéb',
	'Funkcionális Köredzés',
];

const CareerFormDialog = () => {
	const [onAttempt, setOnAttempt] = useState(false);
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
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
			phone: '',
		},
	});

	const onSubmit = async () => {
		console.log('submit');
		setOnAttempt(true);

		setTimeout(() => {
			setOnAttempt(false);
		}, 2000);
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

								<div className="mb-7">
									<label htmlFor="phone" className="ml-1 mb-1 block">
										Telefonszám*
									</label>
									<input
										id="phone"
										type="text"
										className="white-input"
										{...register('phone', {
											required: 'Mező megadása kötelező',
										})}
									/>
									{errors.phone && (
										<motion.div
											className="mt-2 text-rose-700"
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
										>
											{errors.phone.message}
										</motion.div>
									)}
								</div>

								<div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5">
									{classesData.map((_class) => (
										<div className="flex flex-row" key={_class}>
											<Switch
												checked={selectedClasses.includes(_class)}
												onChange={() => selectedClassChange(_class)}
												className={`${
													selectedClasses.includes(_class)
														? 'bg-site-3'
														: 'bg-white'
												}  h-4 w-4 rounded border-white border-2`}
											/>
											<div
												className="ml-2 cursor-pointer"
												onClick={() => selectedClassChange(_class)}
											>
												{_class}
											</div>
										</div>
									))}
								</div>

								<div>
									<Btn
										text="Kérem keressenek"
										customClasses="btn-dark w-full"
										clickEvent={() => console.log('send career form')}
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
