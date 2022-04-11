import React, { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useToasts, useUser } from '../../hooks';
import { motion } from 'framer-motion';
import { validateEmail } from '../../utils';
import { RadioGroup, Switch } from '@headlessui/react';
import RadioOption from '../elements/form/RadioOption';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import { RegisterUserType } from '../../types/UserType';
import { format } from 'date-fns';
import ContentLoader from '../elements/ContentLoader';
import { useRouter } from 'next/router';

type FormValues = {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	passwordConfirm: string;
};

const RegisterSection = () => {
	const [onAttempt, setAttempt] = useState<boolean>(false);
	const [gender, setGender] = useState<'F' | 'M' | 'X' | undefined>(undefined);
	const [gdprChecked, setGdprChecked] = useState<boolean>(false);
	const [newsletterChecked, setNewsletterChecked] = useState<boolean>(false);
	const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
	const router = useRouter();
	const [valErrors, setValErrors] = useState<{
		gender: string | null;
		birthdate: string | null;
		gdpr: string | null;
	}>({
		gender: null,
		birthdate: null,
		gdpr: null,
	});
	const { doRegister } = useUser();
	const { notify } = useToasts();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit = async () => {
		const email = getValues('email');
		const password = getValues('password');
		const passwordConfirm = getValues('passwordConfirm');
		const firstname = getValues('firstname');
		const lastname = getValues('lastname');
		let valFlag = false;

		if (!birthdate) {
			setValErrors((prevVal) => ({
				...prevVal,
				birthdate: 'Mező megadása kötelező',
			}));

			valFlag = true;
		} else {
			setValErrors((prevVal) => ({ ...prevVal, birthdate: null }));
		}

		if (!gender) {
			setValErrors((prevVal) => ({
				...prevVal,
				gender: 'Mező megadása kötelező',
			}));

			valFlag = true;
		} else {
			setValErrors((prevVal) => ({ ...prevVal, gender: null }));
		}

		if (!gdprChecked) {
			setValErrors((prevVal) => ({
				...prevVal,
				gdpr: 'Mező megadása kötelező',
			}));
			valFlag = true;
		} else {
			setValErrors((prevVal) => ({ ...prevVal, gdpr: null }));
		}

		if (!validateEmail(email)) {
			setError('email', {
				type: 'manual',
				message: 'Hibás e-mail cím formátum',
			});
			valFlag = true;
		}

		if (password !== passwordConfirm) {
			setError('passwordConfirm', {
				type: 'manual',
				message: 'A két jelszó nem egyezik',
			});
			valFlag = true;
		}

		if (valFlag) return;

		const userData: RegisterUserType = {
			first_name: firstname,
			last_name: lastname,
			email: email,
			password: password,
			gender: gender || 'X',
			birth_date: format(birthdate as Date, 'yyyy-MM-dd'),
			newslatter: newsletterChecked,
		};

		setAttempt(true);

		const registerAttempt = await doRegister(userData);

		setAttempt(false);

		if (registerAttempt.status) {
			notify('INFO', 'Sikeres regisztráció, erősítsd meg az e-mail címedet');
			router.push('/');
		} else {
			// notify('ERROR', registerAttempt.message);
			registerAttempt.errors.map((err) => {
				if (err.field === 'first_name')
					setError('firstname', { message: err.message });
				if (err.field === 'last_name')
					setError('lastname', { message: err.message });
				if (err.field === 'email') setError('email', { message: err.message });
				if (err.field == 'password')
					setError('password', { message: err.message });
				if (err.field === 'first_name')
					setError('firstname', { message: err.message });
			});
		}
	};

	const onError: SubmitErrorHandler<FormValues> = (err) => {
		console.log(err);
	};

	return (
		<div className="flex items-center justify-center relative">
			<div className="relative w-full bg-site-20 p-8 rounded-xl">
				<div>
					<div>
						<form onSubmit={handleSubmit(onSubmit, onError)}>
							<div className="grid grid-cols-2 gap-5 mb-5">
								<div>
									<label htmlFor="lastname" className="ml-1 mb-1 block">
										Vezetéknév*
									</label>
									<input
										id="lastname"
										type="text"
										className="white-input"
										{...register('lastname', {
											required: 'Mező megadása kötelező',
										})}
									/>
									{errors.lastname && (
										<motion.div
											className="mt-2 text-rose-700"
											animate={{ y: 0 }}
											initial={{ y: 10 }}
										>
											{errors.lastname.message}
										</motion.div>
									)}
								</div>
								<div>
									<label htmlFor="firstname" className="ml-1 mb-1 block">
										Keresztnév*
									</label>
									<input
										id="firstname"
										type="firstname"
										className="white-input"
										{...register('firstname', {
											required: 'Mező megadása kötelező',
										})}
									/>
									{errors.firstname && (
										<motion.div
											className="mt-2 text-rose-700"
											animate={{ y: 0 }}
											initial={{ y: 10 }}
										>
											{errors.firstname.message}
										</motion.div>
									)}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-5 mb-5">
								<div>
									<label htmlFor="lastname" className="ml-1 mb-1 block">
										Születési idő*
									</label>
									<DatePicker
										className="white-input"
										selected={birthdate}
										onChange={(date: Date) => setBirthdate(date)}
										dateFormat="yyyy-MM-dd"
										required
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										maxDate={new Date()}
									/>
									{valErrors.birthdate && (
										<motion.div
											animate={{ y: 0 }}
											initial={{ y: 10 }}
											className="mt-2 text-rose-700"
										>
											{valErrors.birthdate}
										</motion.div>
									)}
								</div>
							</div>

							<div className="mb-5">
								<RadioGroup value={gender} onChange={setGender}>
									<RadioGroup.Label className="mb-1 block">
										Nem
									</RadioGroup.Label>

									<div className="flex">
										<RadioGroup.Option className="mr-14" value="F">
											{({ checked }) => (
												<RadioOption
													text="Nő"
													defaultClasses="w-5 h-5 mr-4 rounded-full bg-white"
													activeClasses="bg-site-19 border-4 border-white"
													checked={checked}
												/>
											)}
										</RadioGroup.Option>
										<RadioGroup.Option className="mr-14" value="M">
											{({ checked }) => (
												<RadioOption
													text="Férfi"
													defaultClasses="w-5 h-5 mr-4 rounded-full bg-white"
													activeClasses="bg-site-19 border-4 border-white"
													checked={checked}
												/>
											)}
										</RadioGroup.Option>
										<RadioGroup.Option value="X">
											{({ checked }) => (
												<RadioOption
													text="Nem nyilatkozom"
													defaultClasses="w-5 h-5 mr-4 rounded-full bg-white"
													activeClasses="bg-site-19 border-4 border-white"
													checked={checked}
												/>
											)}
										</RadioGroup.Option>
									</div>
								</RadioGroup>

								{valErrors.gender && (
									<motion.div
										animate={{ y: 0 }}
										initial={{ y: 10 }}
										className="mt-2 text-rose-700"
									>
										{valErrors.gender}
									</motion.div>
								)}
							</div>

							<div className="mb-5">
								<label htmlFor="email" className="ml-1 mb-1 block">
									E-mail*
								</label>
								<input
									id="email"
									type="email"
									className="white-input"
									{...register('email', { required: 'Mező megadása kötelező' })}
								/>
								{errors.email && (
									<motion.div
										className="mt-2 text-rose-700"
										animate={{ y: 0 }}
										initial={{ y: 10 }}
									>
										{errors.email.message}
									</motion.div>
								)}
							</div>

							<div className="mb-5">
								<label htmlFor="password" className="ml-1 mb-1 block">
									Jelszó*
								</label>
								<input
									id="password"
									type="password"
									className="white-input"
									{...register('password', {
										required: 'Mező megadása kötelező',
										pattern: {
											value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
											message:
												'A jelszónak tartalmaznia kell legalább egy: nagybetűt, kisbetűt, számot',
										},
									})}
								/>
								{errors.password && (
									<motion.div
										className="mt-2 text-rose-700"
										animate={{ y: 0 }}
										initial={{ y: 10 }}
									>
										{errors.password.message}
									</motion.div>
								)}
							</div>

							<div className="mb-8">
								<label htmlFor="password-confirm" className="ml-1 mb-1 block">
									Jelszó megerősítése*
								</label>
								<input
									id="password-confirm"
									type="password"
									className="white-input"
									{...register('passwordConfirm', {
										required: 'Mező megadása kötelező',
									})}
								/>
								{errors.passwordConfirm && (
									<motion.div
										className="mt-2 text-rose-700"
										animate={{ y: 0 }}
										initial={{ y: 10 }}
									>
										{errors.passwordConfirm.message}
									</motion.div>
								)}
							</div>

							<div className="mb-3">
								<div className="flex">
									<div className="mr-4">
										<Switch
											checked={gdprChecked}
											onChange={setGdprChecked}
											className={`${
												gdprChecked ? 'bg-site-19' : 'bg-white'
											}  h-5 w-5 rounded border-white border-4`}
										/>
									</div>
									<div>
										Elolvastam és elfogadom a{' '}
										<Link href="#">
											<a
												href="http://fx.fotexnet.hu/docs/adatvedelmitajekoztatoSF.pdf"
												target={'_blank'}
												className="text-site-19 underline"
											>
												Sugár Fitness adatvédelmi tájékoztatóját
											</a>
										</Link>
									</div>
								</div>
								{valErrors.gdpr && (
									<motion.div
										animate={{ y: 0 }}
										initial={{ y: 10 }}
										className="mt-2 text-rose-700"
									>
										{valErrors.gdpr}
									</motion.div>
								)}
							</div>

							<div className="mb-8 flex">
								<div className="mr-4">
									<Switch
										checked={newsletterChecked}
										onChange={setNewsletterChecked}
										className={`${
											newsletterChecked ? 'bg-site-19' : 'bg-white'
										}  h-5 w-5 rounded border-white border-4`}
									/>
								</div>
								<div>Feliratkozom a hírlevélre</div>
							</div>

							<div>
								<motion.button
									whileTap={{ scale: 0.95 }}
									type="submit"
									className={` transition-colors bg-site-19 text-white relative cursor-pointer uppercase text-center w-full block px-8 py-3 rounded-3xl font-bold tracking-widest `}
								>
									Regisztráció
								</motion.button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{onAttempt && (
				<div className="absolute inset-0 bg-site-20 bg-opacity-60 flex items-center justify-center rounded-xl">
					<ContentLoader spinnerColor="border-site-19" />
				</div>
			)}
		</div>
	);
};

export default RegisterSection;
