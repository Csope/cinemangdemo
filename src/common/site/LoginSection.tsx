import { Dialog } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useToasts, useUser } from '../../hooks';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import ContentLoader from '../elements/ContentLoader';
import { useRouter } from 'next/router';
import Btn from '../elements/buttons/Btn';
interface PropTypes {
	showLogin: boolean;
	hideLogin: () => void;
}

type FormValues = {
	email: string;
	password: string;
};

const LoginSection = ({ showLogin, hideLogin }: PropTypes) => {
	// const [onAttempt, setOnAttempt] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const router = useRouter();
	const { doSignInCredentials } = useUser();
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
			password: '',
		},
	});

	const onSubmit = async () => {
		setErrorMsg(null);
		setLoading(true);

		const [email, password] = getValues(['email', 'password']);
		const attempt = await doSignInCredentials(email, password);

		setLoading(false);

		if (attempt && attempt.status === 200) {
			notify('SUCCESS', 'Sikeres bejelentkezés');
			hideLogin();
		} else {
			setErrorMsg('Hibás felhasználónév / jelszó');
		}
	};

	const onError: SubmitErrorHandler<FormValues> = (err) => {};

	const routeChange = () => {
		hideLogin();
	};

	useEffect(() => {
		router.events.on('routeChangeStart', routeChange);

		return () => {
			reset();
			setErrorMsg(null);
			router.events.off('routeChangeStart', routeChange);
		};
	}, [showLogin]);

	return (
		<Dialog
			open={showLogin}
			onClose={hideLogin}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					className="relative pt-12 md:pt-8 h-screen md:h-auto w-full md:w-6/12 bg-site-1 md:bg-glow-purple md:p-8 md:rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-2xl"
						onClick={hideLogin}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-3">
						Bejelentkezés
					</h1>

					<div className="text-center mb-2 md:mb-4">
						Nincs még fiókod?
						<Link href="register">
							<a className="text-site-4 ml-1">Regisztrálj most</a>
						</Link>
					</div>

					{errorMsg && (
						<motion.div
							className="mt-2 text-rose-700 text-center font-bold text-lg"
							animate={{ opacity: 1 }}
							initial={{ opacity: 0 }}
						>
							{errorMsg}
						</motion.div>
					)}

					<div>
						<div className="p-4">
							<form onSubmit={handleSubmit(onSubmit, onError)}>
								<div className="mb-5">
									<label htmlFor="email" className="ml-1 mb-1 block">
										E-mail*
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
									<label htmlFor="password" className="ml-1 mb-1 block">
										Jelszó*
									</label>
									<input
										id="password"
										type="password"
										className="white-input"
										{...register('password', {
											required: 'Mező megadása kötelező',
										})}
									/>
									{errors.password && (
										<motion.div
											className="mt-2 text-rose-700"
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
										>
											{errors.password.message}
										</motion.div>
									)}
								</div>
								<div className="text-center text-site-4 mb-4">
									<Link href="#">Elfelejtetted a jelszavadat?</Link>
								</div>
								<div className="mb-8">
									<Btn
										text="Belépés e-mail címmel"
										customClasses="btn-dark w-full"
										clickEvent={() => console.log('credentiols login')}
									/>
								</div>
								<div className="relative mb-8">
									<div className=" w-full h-px bg-black"></div>
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-site-1 px-2">
										vagy
									</div>
								</div>
							</form>
							<div className="mb-4">
								<Btn
									customClasses="btn-light text-black w-full"
									clickEvent={() => console.log('login fb')}
									text={
										<>
											<div
												className="absolute left-5 top-1/2 -translate-y-1/2 text-xl"
												style={{ color: '#485a94' }}
											>
												<GrFacebook />
											</div>
											Belépés facebook fiókkal
										</>
									}
								/>
							</div>
							<div>
								<Btn
									customClasses="btn-light text-black w-full"
									clickEvent={() => console.log('login fb')}
									text={
										<>
											<div className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
												<FcGoogle />
											</div>
											Belépés google fiókkal
										</>
									}
								/>
							</div>
						</div>
					</div>

					{loading && (
						<div className="absolute inset-0 flex justify-center items-center bg-site-1 rounded-xl bg-opacity-70">
							<ContentLoader />
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default LoginSection;
