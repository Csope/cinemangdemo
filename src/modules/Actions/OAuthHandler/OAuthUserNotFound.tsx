import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import Btn from '../../../common/elements/buttons/Btn';
import ContentLoader from '../../../common/elements/ContentLoader';
import PasswordVisibilityIcon from '../../../common/site/PasswordVisibilityIcon';
import RegisterSection from '../../../common/site/RegisterSection';
import { useToasts } from '../../../hooks';
import { ResType } from '../../../types';

const OAuthUserNotFound = ({
	provider,
	firstname,
	lastname,
	email,
	token,
}: any) => {
	const [show, setShow] = useState<boolean>(true);
	const [progress, setProgress] = useState<
		'question' | 'register' | 'existing'
	>('question');
	const popupContent = useRef(null);

	const cancelAction = () => {
		setShow(false);
	};

	return (
		<div>
			<Dialog
				open={show}
				onClose={cancelAction}
				className="fixed z-10 inset-0 overflow-y-auto"
			>
				<div className="flex items-center justify-center min-h-screen">
					<Dialog.Overlay className="hidden md:block fixed inset-0 opacity-80 bg-white" />

					<div
						ref={popupContent}
						className={`${
							progress === 'register'
								? 'bg-site-20 bg-glow-blue'
								: 'bg-site-1 bg-glow-purple px-4 pb-8 md:px-8 flex md:block items-center justify-center'
						} fixed h-screen overflow-y-auto md:h-auto md:block md:relative lg:w-6/12 pt-8 md:rounded-xl`}
						style={{ maxWidth: 500 }}
					>
						{progress === 'question' && (
							<QuestionWrapper
								existingUserClick={() => setProgress('existing')}
								newUserClick={() => setProgress('register')}
							/>
						)}

						{progress === 'register' && (
							<RegisterWrapper
								provider={provider}
								firstname={firstname}
								lastname={lastname}
								email={email}
								token={token}
							/>
						)}

						{progress === 'existing' && (
							<ExistingWrapper
								token={token}
								provider={provider}
								cancelAction={cancelAction}
							/>
						)}

						<div
							className={`${
								progress === 'register' ? 'text-site-19' : 'text-site-4'
							} absolute cursor-pointer right-5 top-4 text-3xl`}
							onClick={cancelAction}
						>
							<AiFillCloseCircle />
						</div>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

const QuestionWrapper = ({ existingUserClick, newUserClick }: any) => {
	return (
		<div>
			<h1 className="text-center h1-shadow h1-shadow--purple text-2xl mb-4 px-4">
				Ezen az E-mail c??men nincs regisztr??ci??!
			</h1>

			<div className="text-center px-6 text-lg mb-6">
				Amennyiben m??r regisztr??lt tagunk vagy, a regisztr??ci??kor megadott
				e-mail c??meddel jelentkezz be. Ha m??g nem regisztr??lt??l k??rlek kattints
				a "regisztr??ci??" gombra.
			</div>

			<div className="grid grid-cols-1 reverse gap-4  w-full">
				<div>
					<Btn
						text="Bejelentkez??s"
						clickEvent={existingUserClick}
						customClasses="btn-light w-full"
					/>
				</div>
				<div>
					<Btn
						text="Regisztr??ci??"
						clickEvent={newUserClick}
						customClasses="btn-dark w-full"
					/>
				</div>
			</div>
		</div>
	);
};

const ExistingWrapper = ({ provider, token, cancelAction }: any) => {
	const [showPassword, setShowPassword] = useState(false);
	const [onAttempt, setOnAttempt] = useState<boolean>(false);
	const { notify } = useToasts();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors },
	} = useForm<{
		email: string;
		password: string;
	}>();

	const onSubmit = async () => {
		setErrorMsg(null);

		try {
			setOnAttempt(true);
			const { data } = await axios.post<ResType<any>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/social/link/${provider}`,
				// `http://10.13.4.92:2019/api/v1/users/social/link/${provider}`,
				{
					email: getValues('email'),
					password: getValues('password'),
					token,
				}
			);

			if (data.status) {
				notify('SUCCESS', 'Sikeres bejelentkez??s');
				signIn(provider, {
					callbackUrl: '/',
				});
			} else {
				setOnAttempt(false);

				if (data.message) {
					setErrorMsg(data.message);
				} else {
					notify('ERROR', 'Bels?? kiszolg??l??hiba, pr??b??ld ??jra k??s??bb');
				}
			}
		} catch (error) {
			setOnAttempt(false);
			notify('ERROR', 'Bels?? kiszolg??l??hiba, pr??b??ld ??jra k??s??bb');
		}
	};

	return (
		<>
			<div>
				<h1 className="text-center h1-shadow h1-shadow--purple text-2xl md:text-3xl mb-3">
					Bejelentkez??s
				</h1>

				<div className="text-center mb-2 md:mb-4">
					Nincs m??g fi??kod?
					<Link href="register">
						<a
							className="text-site-4 ml-1"
							onKeyDown={(e) => e.preventDefault()}
							onClick={() => cancelAction()}
						>
							Regisztr??lj most
						</a>
					</Link>
				</div>

				{errorMsg && (
					<div className="mb-6 mt-2 text-rose-700 text-center font-bold text-lg">
						{errorMsg}
					</div>
				)}

				<div className="w-full">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-5">
							<label htmlFor="or_email" className="ml-1 mb-1 block">
								E-mail*
							</label>
							<input
								id="or_email"
								type="email"
								className="white-input"
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

						<div className="mb-10">
							<label htmlFor="or_password" className="ml-1 mb-1 block">
								Jelsz??*
							</label>
							<div className="relative">
								<input
									id="or_password"
									type={`${showPassword ? 'text' : 'password'}`}
									className="white-input"
									{...register('password', {
										required: 'Mez?? megad??sa k??telez??',
									})}
								/>
								<div className="absolute top-1/2 -translate-y-1/2 right-0 text-site-4 bg-white p-2 text-2xl">
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

						<Btn
							text="Bejelentkez??s"
							clickEvent={() => null}
							customClasses="btn-dark w-full"
						/>
					</form>
				</div>
			</div>
			{onAttempt && (
				<div className="absolute inset-0 bg-site-1 bg-opacity-60 flex items-center justify-center rounded-xl">
					<ContentLoader />
				</div>
			)}
		</>
	);
};

const RegisterWrapper = ({
	provider,
	firstname,
	lastname,
	email,
	token,
}: any) => {
	const [onAttempt, setOnAttempt] = useState<boolean>(false);

	return (
		<>
			<div>
				<h1 className="h1-shadow h1-shadow--blue py-2 md:py-0 text-center text-2xl">
					Regisztr??ci??
				</h1>
			</div>
			<RegisterSection
				hasData={{
					email,
					firstname,
					lastname,
					token,
					provider,
				}}
			/>
			{onAttempt && (
				<div className="absolute inset-0 bg-site-20 bg-opacity-60 flex items-center justify-center rounded-xl">
					<ContentLoader spinnerColor="border-site-19" />
				</div>
			)}
		</>
	);
};
export default OAuthUserNotFound;
