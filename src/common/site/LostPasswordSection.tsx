import { Dialog } from '@headlessui/react';
import React, { useState, useEffect, useRef } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { useActions, useSiteStates, useToasts, useUser } from '../../hooks';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import ContentLoader from '../elements/ContentLoader';
import { useRouter } from 'next/router';
import Btn from '../elements/buttons/Btn';
interface PropTypes {
	showForm: boolean;
	hideForm: () => void;
}

type FormValues = {
	email: string;
};

const LostPasswordSection = ({ showForm, hideForm }: PropTypes) => {
	const { doDisableScroll, doEnableScroll } = useActions();
	const popupContent = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string | JSX.Element | null>(null);
	const router = useRouter();
	const { doSendLostPassword } = useUser();
	const { notify } = useToasts();
	const { doHideLostPassword } = useSiteStates();
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async () => {
		setErrorMsg(null);

		setLoading(true);

		const res = await doSendLostPassword(getValues('email'));

		if (res.status) {
			notify('SUCCESS', 'Az e-mailt kiküldtük a megadott címre');
			doHideLostPassword();
		} else {
			notify('ERROR', res.message || '');
		}

		setLoading(false);
	};

	const routeChange = () => {
		hideForm();
	};

	useEffect(() => {
		if (showForm) {
			if (popupContent.current) {
				doDisableScroll(popupContent.current);
			}
		} else {
			doEnableScroll();
		}

		router.events.on('routeChangeStart', routeChange);

		return () => {
			reset();
			setErrorMsg(null);
			setLoading(false);
			router.events.off('routeChangeStart', routeChange);
		};
	}, [showForm]);

	return (
		<Dialog
			open={showForm}
			onClose={hideForm}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="hidden md:block fixed inset-0 opacity-80 bg-white" />

				<div
					ref={popupContent}
					className="fixed inset-0 flex flex-col justify-center  overflow-y-auto md:relative pt-12 px-4 md:pt-8 h-screen md:h-auto w-full md:w-6/12 bg-site-1 md:bg-glow-purple md:p-8 md:rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-2xl"
						onClick={hideForm}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-2xl md:text-3xl mb-3">
						Elfelejtett jelszó
					</h1>

					<div className="text-center mb-2">
						Amennyiben már rendelkezel felhasználói fiókkal, kérjük add meg az
						e-mail címedet! Erre az e-mail címre küldjük ki az új jelszó
						megadásához szükséges linket!
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

					<div className="w-full">
						<div className="py-4">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-7">
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
								<div>
									<div>
										<Btn
											text="E-mail küldése"
											customClasses="btn-dark w-full"
											clickEvent={() => null}
										/>
									</div>
								</div>
							</form>
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

export default LostPasswordSection;
