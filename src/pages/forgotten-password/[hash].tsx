import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Btn from '../../common/elements/buttons/Btn';
import ContentLoader from '../../common/elements/ContentLoader';
import { useToasts, useUser } from '../../hooks';
import { ResType } from '../../types';
import { GoPrimitiveDot } from 'react-icons/go';

type FormValues = {
	password: string;
	passwordConfirm: string;
};

type PropTypes = {
	hash: string;
};

const ForgottenPasword = ({ hash }: PropTypes) => {
	const [onAttempt, setAttempt] = useState<boolean>(false);
	const { doChangePassword } = useUser();
	const { notify } = useToasts();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit = async () => {
		const password = getValues('password');
		const passwordConfirm = getValues('passwordConfirm');

		if (password !== passwordConfirm) {
			setError('passwordConfirm', {
				type: 'manual',
				message: 'A két jelszó nem egyezik',
			});

			return false;
		}

		setAttempt(true);

		const res = await doChangePassword(password, passwordConfirm, hash);

		if (res.status) {
			notify('SUCCESS', 'Sikeres jelszó módosítás');
			router.push('/');
		} else {
			notify('ERROR', res.message || '');
		}

		setAttempt(false);
	};

	return (
		<div className="page">
			<div className="pb-8">
				<div
					className="relative pt-8 pb-8 px-4 md:pt-8 w-auto md:w-6/12 bg-site-1 mx-4 md:mx-auto md:p-8 rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div>
						<h1 className="text-center h1-shadow h1-shadow--purple text-2xl md:text-3xl mb-6">
							Jelszó módosítása
						</h1>
					</div>

					<div className="text-center text- mb-2 md:mb-10">
						Kérlek add meg az új jelszavadat. <br />
						Jelszó formátum:
						<ul>
							<li>&#x2022; Minimum 8 karakter hosszú </li>
							<li>&#x2022; és Tartalmazzon legalább 1 nagybetűt és 1 számot</li>
						</ul>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-5">
							<label htmlFor="password" className="ml-1 mb-1 block">
								Új jelszó*
							</label>
							<input
								id="password"
								type="password"
								className="white-input"
								{...register('password', {
									required: 'Mező megadása kötelező',
									pattern: {
										value:
											/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z?!+-@\(\)\[\]\{\}$%*#\/._]{8,}$/,
										message:
											'A jelszónak tartalmaznia kell legalább egy: nagybetűt, kisbetűt, számot',
									},
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

						<div className="mb-10">
							<label htmlFor="passwordConfirm" className="ml-1 mb-1 block">
								Jelszó megerősítése*
							</label>
							<input
								id="passwordConfirm"
								type="password"
								className="white-input"
								{...register('passwordConfirm', {
									required: 'Mező megadása kötelező',
									pattern: {
										value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
										message:
											'A jelszónak tartalmaznia kell legalább egy: nagybetűt, kisbetűt, számot',
									},
								})}
							/>
							{errors.passwordConfirm && (
								<motion.div
									className="mt-2 text-rose-700"
									animate={{ opacity: 1 }}
									initial={{ opacity: 0 }}
								>
									{errors.passwordConfirm.message}
								</motion.div>
							)}
						</div>

						<Btn
							text="Jelszó megváltoztatása"
							customClasses="btn-dark w-full"
							clickEvent={() => console.log('credentials login')}
						/>
					</form>

					{onAttempt && (
						<div className="absolute inset-0 flex justify-center items-center bg-site-1 rounded-xl bg-opacity-70">
							<ContentLoader />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { hash } = context.query;

	if (hash && hash !== '') {
		try {
			const { data } = await axios.get<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/forgotten-password/${hash}`
			);

			if (!data.status) {
				return {
					redirect: {
						permanent: false,
						destination: '/404',
					},
				};
			}
		} catch (error) {
			return {
				redirect: {
					permanent: false,
					destination: '/404',
				},
			};
		}
	}

	return {
		props: {
			hash,
		},
	};
};

export default ForgottenPasword;
