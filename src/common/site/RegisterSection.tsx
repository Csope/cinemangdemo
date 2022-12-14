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
import Btn from '../elements/buttons/Btn';
import { signIn } from 'next-auth/react';
import PasswordVisibilityIcon from './PasswordVisibilityIcon';

type FormValues = {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	passwordConfirm: string;
};

type PropTypes = {
	hasData?: {
		email: string;
		firstname: string;
		lastname: string;
		token: string;
		provider: string;
	};
};

const RegisterSection = ({ hasData }: PropTypes) => {
	const [showPassword, setShowPassword] = useState(false);
	const [onAttempt, setAttempt] = useState<boolean>(false);
	const [gender, setGender] = useState<'F' | 'M' | 'X' | undefined>(undefined);
	const [gdprChecked, setGdprChecked] = useState<boolean>(false);
	const [termsChecked, setTermsChecked] = useState<boolean>(false);
	const [newsletterChecked, setNewsletterChecked] = useState<boolean>(false);
	const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
	const router = useRouter();
	const [valErrors, setValErrors] = useState<{
		gender: string | null;
		birthdate: string | null;
		gdpr: string | null;
		terms: string | null;
	}>({
		gender: null,
		birthdate: null,
		gdpr: null,
		terms: null,
	});
	const { doRegister, doRegisterSocial } = useUser();
	const { notify } = useToasts();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: hasData
			? {
					email: hasData.email,
					firstname: hasData.firstname,
					lastname: hasData.lastname,
			  }
			: { email: '' },
	});

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
				birthdate: 'Mez?? megad??sa k??telez??',
			}));

			valFlag = true;
		} else {
			setValErrors((prevVal) => ({ ...prevVal, birthdate: null }));
		}

		if (!gender) {
			setValErrors((prevVal) => ({
				...prevVal,
				gender: 'Mez?? megad??sa k??telez??',
			}));

			valFlag = true;
		} else {
			setValErrors((prevVal) => ({ ...prevVal, gender: null }));
		}

		if (!termsChecked) {
			setValErrors((prevVal) => ({
				...prevVal,
				terms: 'Mez?? megad??sa k??telez??',
			}));

			valFlag = true;
		} else {
			setValErrors((prevVal) => ({ ...prevVal, terms: null }));
		}

		if (!gdprChecked) {
			setValErrors((prevVal) => ({
				...prevVal,
				gdpr: 'Mez?? megad??sa k??telez??',
			}));
			valFlag = true;
		} else {
			setValErrors((prevVal) => ({ ...prevVal, gdpr: null }));
		}

		if (!validateEmail(email)) {
			setError('email', {
				type: 'manual',
				message: 'Hib??s e-mail c??m form??tum',
			});
			valFlag = true;
		}

		if (password !== passwordConfirm) {
			setError('passwordConfirm', {
				type: 'manual',
				message: 'A k??t jelsz?? nem egyezik',
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
			newsletter: newsletterChecked,
		};

		setAttempt(true);

		let registerAttempt;

		if (hasData) {
			registerAttempt = await doRegisterSocial(
				{
					...userData,
					token: hasData.token,
				},
				hasData.provider
			);
		} else {
			registerAttempt = await doRegister(userData);
		}

		setAttempt(false);

		if (registerAttempt.status) {
			if (hasData) {
				notify('SUCCESS', 'Sikeres bejelentkez??s');
				signIn(hasData.provider, {
					callbackUrl: '/',
				});
			} else {
				notify(
					'INFO',
					'Sikeres regisztr??ci??, k??rlek er??s??tsd meg az e-mail c??medet'
				);
				router.push('/');
			}
		} else {
			if (registerAttempt.errors.length > 0) {
				registerAttempt.errors.map((err) => {
					if (err.field === 'first_name')
						setError('firstname', { message: err.message });
					if (err.field === 'last_name')
						setError('lastname', { message: err.message });
					if (err.field === 'email')
						setError('email', { message: err.message });
					if (err.field == 'password')
						setError('password', { message: err.message });
					if (err.field === 'first_name')
						setError('firstname', { message: err.message });
				});
			} else {
				notify('ERROR', registerAttempt.message);
			}
		}
	};

	const onError: SubmitErrorHandler<FormValues> = (err) => {
		console.log(err);
	};

	return (
		<div className="flex items-center justify-center relative mx-4 md:mx-0 ">
			<div className="relative w-full bg-site-20 px-4 py-8 md:px-8 mb-4 md:mb-0 rounded-xl">
				<div>
					<div>
						<form onSubmit={handleSubmit(onSubmit, onError)}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
								<div>
									<label htmlFor="lastname" className="ml-1 mb-1 block">
										Vezet??kn??v*
									</label>
									<input
										id="lastname"
										type="text"
										className="white-input"
										{...register('lastname', {
											required: 'Mez?? megad??sa k??telez??',
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
										Keresztn??v*
									</label>
									<input
										id="firstname"
										type="firstname"
										className="white-input"
										{...register('firstname', {
											required: 'Mez?? megad??sa k??telez??',
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
										Sz??let??si id??*
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
										<RadioGroup.Option className="mr-4 md:mr-14" value="F">
											{({ checked }) => (
												<RadioOption
													text="N??"
													defaultClasses="w-5 h-5 mr-2 rounded-full bg-white"
													activeClasses="bg-site-19 border-4 border-white"
													checked={checked}
												/>
											)}
										</RadioGroup.Option>
										<RadioGroup.Option className="mr-4 md:mr-14" value="M">
											{({ checked }) => (
												<RadioOption
													text="F??rfi"
													defaultClasses="w-5 h-5 mr-2 rounded-full bg-white"
													activeClasses="bg-site-19 border-4 border-white"
													checked={checked}
												/>
											)}
										</RadioGroup.Option>
										<RadioGroup.Option value="X">
											{({ checked }) => (
												<RadioOption
													text="Nem nyilatkozom"
													defaultClasses="w-5 h-5 mr-2 rounded-full bg-white"
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
									readOnly={hasData ? true : false}
									{...register('email', { required: 'Mez?? megad??sa k??telez??' })}
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
									Jelsz??*
								</label>

								<div className="relative">
									<input
										id="password"
										type={`${showPassword ? 'text' : 'password'}`}
										className="white-input pr-10!"
										{...register('password', {
											required: 'Mez?? megad??sa k??telez??',
											pattern: {
												value:
													/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z?!+-@\(\)\[\]\{\}$%*#\/._]{8,}$/,
												message:
													'A jelsz??nak tartalmaznia kell legal??bb egy: nagybet??t, kisbet??t, sz??mot',
											},
										})}
									/>
									<div className="absolute top-1/2 -translate-y-1/2 right-0 text-site-19 bg-white p-2 text-2xl">
										<PasswordVisibilityIcon
											show={showPassword}
											clickEvent={(e) => setShowPassword(!showPassword)}
										/>
									</div>
								</div>

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
									Jelsz?? meger??s??t??se*
								</label>
								<input
									id="password-confirm"
									type={`${showPassword ? 'text' : 'password'}`}
									className="white-input"
									{...register('passwordConfirm', {
										required: 'Mez?? megad??sa k??telez??',
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
											checked={termsChecked}
											onChange={setTermsChecked}
											className={`${
												termsChecked ? 'bg-site-19' : 'bg-white'
											}  h-5 w-5 rounded border-white border-4`}
										/>
									</div>
									<div>
										Elolvastam ??s tudom??sul vettem a{' '}
										<a
											href="/hazirend"
											target={'_blank'}
											rel="noreferrer"
											className="text-site-19 underline"
										>
											H??zirendet
										</a>
									</div>
								</div>
								{valErrors.terms && (
									<motion.div
										animate={{ y: 0 }}
										initial={{ y: 10 }}
										className="mt-2 text-rose-700"
									>
										{valErrors.terms}
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
										Elolvastam ??s elfogadom a{' '}
										<a
											href="http://fx.fotexnet.hu/docs/adatvedelmitajekoztatoSF.pdf"
											target={'_blank'}
											rel="noreferrer"
											className="text-site-19 underline"
										>
											Sug??r Fitness adatv??delmi t??j??koztat??j??t
										</a>
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
								<div>Feliratkozom a h??rlev??lre</div>
							</div>

							<div>
								<Btn
									text="Regisztr??ci??"
									customClasses="w-full bg-site-19 text-white"
									clickEvent={() => null}
								/>
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
