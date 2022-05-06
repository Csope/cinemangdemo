import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
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
							<ExistingWrapper token={token} provider={provider} />
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
				Lorem ipsum dolor sit amet consectetur
			</h1>

			<div className="text-center px-6 text-lg mb-6">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum
				dolor sit amet consectetur adipisicing elit. Placeat, quisquam!
			</div>

			<div className="grid grid-cols-1 reverse md:grid-cols-2 gap-4 md:gap-10 w-full">
				<div>
					<Btn
						text="Meglevo"
						clickEvent={existingUserClick}
						customClasses="btn-light w-full"
					/>
				</div>
				<div>
					<Btn
						text="Uj"
						clickEvent={newUserClick}
						customClasses="btn-dark w-full"
					/>
				</div>
			</div>
		</div>
	);
};

const ExistingWrapper = ({ provider, token }: any) => {
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
				notify('SUCCESS', 'Lorem ipsum dorol sit amte');
				signIn(provider, {
					callbackUrl: '/',
				});
			} else {
				setOnAttempt(false);

				if (data.message) {
					setErrorMsg(data.message);
				} else {
					notify('ERROR', 'Belső kiszolgálóhiba, próbáld újra később');
				}
			}
		} catch (error) {
			setOnAttempt(false);
			notify('ERROR', 'Belső kiszolgálóhiba, próbáld újra később');
		}
	};

	return (
		<>
			<div>
				<h1 className="text-center h1-shadow h1-shadow--purple text-2xl mb-4 px-4">
					Lorem ipsum dolor sit amet consectetur
				</h1>

				<div className="text-center px-6 text-lg mb-6">
					Lorem ipsum dolor sit amet consectetur adipisicing elit
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

						<div className="mb-10">
							<label htmlFor="or_password" className="ml-1 mb-1 block">
								Jelszó*
							</label>
							<div className="relative">
								<input
									id="or_password"
									type={`${showPassword ? 'text' : 'password'}`}
									className="white-input"
									{...register('password', {
										required: 'Mező megadása kötelező',
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
							text="Connect"
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
					Regisztráció
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
