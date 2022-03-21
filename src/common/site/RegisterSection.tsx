import React, { useState } from 'react';
import { FieldValues, SubmitErrorHandler, useForm } from 'react-hook-form';
import { useToasts, useUser } from '../../hooks';
import { motion } from 'framer-motion';
import { validateEmail } from '../../utils';

type FormValues = {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	passwordConfirm: string;
};

const RegisterSection = () => {
	const [onAttempt, setOnAttempt] = useState(false);
	const { doSignInCredentials } = useUser();
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

		if (!validateEmail(email)) {
			setError('email', {
				type: 'manual',
				message: 'Hibás e-mail cím formátum',
			});

			return false;
		}

		if (password !== passwordConfirm) {
			setError('passwordConfirm', {
				type: 'manual',
				message: 'A két jelszó nem egyezik',
			});

			return false;
		}

		console.log('REGISTER');
	};

	const onError: SubmitErrorHandler<FormValues> = (err) => {
		console.log(err);
	};

	return (
		<div className="flex items-center justify-center">
			<div
				className="relative lg:w-6/12 bg-site-1 p-8 rounded-xl"
				style={{ maxWidth: 600 }}
			>
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
										className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
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
										className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
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

							<div className="mb-5">
								<label htmlFor="email" className="ml-1 mb-1 block">
									E-mail*
								</label>
								<input
									id="email"
									type="email"
									className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
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
									className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
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

							<div className="mb-10">
								<label htmlFor="password-confirm" className="ml-1 mb-1 block">
									Jelszó megerősítése*
								</label>
								<input
									id="password-confirm"
									type="password"
									className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
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

							<div>
								<motion.button
									whileTap={{ scale: 0.95 }}
									disabled={onAttempt}
									type="submit"
									className={` transition-colors bg-site-4 text-white relative cursor-pointer uppercase text-center w-full block px-8 py-3 rounded-3xl font-bold tracking-widest  ${
										onAttempt ? ' opacity-60 ' : ' opacity-100'
									}`}
								>
									Regisztráció
								</motion.button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterSection;
