import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from 'react-toastify';
import Btn from '../../common/elements/buttons/Btn';
import { useUser, useToasts } from '../../hooks';
import { UpdateUserType } from '../../types/UserType';
import ProfileAvatar from './ProfileAvatar';
import ContentLoader from '../../common/elements/ContentLoader';

const ProfileData = () => {
	const { user, doUpdateUserData, doSetUserState } = useUser();
	const { notify } = useToasts();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		reset,
		formState: { errors, isDirty, dirtyFields },
	} = useForm({
		defaultValues: {
			lastname: user?.last_name,
			firstname: user?.first_name,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const [onAttempt, setOnAttempt] = useState(false);

	const onSubmit = async () => {
		if (!isDirty) return;

		let pwDirty = false;

		if (
			dirtyFields.currentPassword ||
			dirtyFields.newPassword ||
			dirtyFields.confirmPassword
		) {
			pwDirty = true;

			let pwStageOneFailed = false;

			if (!dirtyFields.currentPassword) {
				setError('currentPassword', {
					type: 'manual',
					message: 'Mező megadása kötelező',
				});

				pwStageOneFailed = true;
			}
			if (!dirtyFields.newPassword) {
				setError('newPassword', {
					type: 'manual',
					message: 'Mező megadása kötelező',
				});

				pwStageOneFailed = true;
			}
			if (!dirtyFields.confirmPassword) {
				setError('confirmPassword', {
					type: 'manual',
					message: 'Mező megadása kötelező',
				});

				pwStageOneFailed = true;
			}

			if (pwStageOneFailed) return;

			if (getValues('newPassword') !== getValues('confirmPassword')) {
				setError('confirmPassword', {
					type: 'manual',
					message: 'A két jelszó nem egyezik',
				});

				pwStageOneFailed = true;
			}

			if (pwStageOneFailed) return;
		}

		const _firstname = getValues('firstname') as string;
		const _lastname = getValues('lastname') as string;

		const newData: UpdateUserType = pwDirty
			? {
					last_name: _lastname,
					first_name: _firstname,
					birth_date: '1993-12-29' as string,
					gender: 'F',
					password: getValues('currentPassword') as string,
					new_password: getValues('newPassword') as string,
			  }
			: {
					last_name: _lastname,
					first_name: _firstname,
					birth_date: '1993-12-29' as string,
					gender: 'F',
			  };

		setOnAttempt(true);
		const updateRes = await doUpdateUserData(newData);
		setOnAttempt(false);

		if (updateRes.status) {
			notify('SUCCESS', updateRes.message);
			reset({
				lastname: _lastname,
				firstname: _firstname,
				newPassword: '',
				currentPassword: '',
				confirmPassword: '',
			});
			// @ts-ignore
			doSetUserState((prevUserData) => {
				return {
					...prevUserData,
					last_name: _lastname,
					first_name: _firstname,
				};
			});
		} else {
			notify('ERROR', updateRes.message);
		}
	};

	const onError = () => {
		console.log('err');
	};

	return (
		<div className="grid grid-cols-2 gap-10">
			<div className="bg-site-1 py-7 px-6 rounded-xl mb-8 relative">
				<h1 className="text-2xl text-center text-site-4 italic font-black uppercase mb-3">
					Adatok
				</h1>

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<div className="mb-5">
						<label htmlFor="lastname" className="ml-1 mb-1 block">
							Vezetéknév*
						</label>
						<input
							id="lastname"
							type="text"
							className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
							{...register('lastname', { required: 'Mező megadása kötelező' })}
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
					<div className="mb-5">
						<label htmlFor="firstname" className="ml-1 mb-1 block">
							Keresztnév*
						</label>
						<input
							id="firstname"
							type="text"
							className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
							{...register('firstname', { required: 'Mező megadása kötelező' })}
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
					<div className="mb-5">
						<label htmlFor="currentPassword" className="ml-1 mb-1 block">
							Jelenlegi jelszó
						</label>
						<input
							id="currentPassword"
							type="password"
							className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
							{...register('currentPassword')}
						/>
						{errors.currentPassword && (
							<motion.div
								className="mt-2 text-rose-700"
								animate={{ y: 0 }}
								initial={{ y: 10 }}
							>
								{errors.currentPassword.message}
							</motion.div>
						)}
					</div>
					<div className="mb-5">
						<label htmlFor="newPassword" className="ml-1 mb-1 block">
							Új jelszó
						</label>
						<input
							id="newPassword"
							type="password"
							className="w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
							{...register('newPassword')}
						/>
						{errors.newPassword && (
							<motion.div
								className="mt-2 text-rose-700"
								animate={{ y: 0 }}
								initial={{ y: 10 }}
							>
								{errors.newPassword.message}
							</motion.div>
						)}
					</div>
					<div className="mb-10">
						<label htmlFor="confirmPassword" className="ml-1 mb-1 block">
							Új jelszó megerősítése
						</label>
						<input
							id="confirmPassword"
							type="password"
							className=" w-full rounded px-2 py-3 focus-visible:outline focus-visible:outline-site-2"
							{...register('confirmPassword')}
						/>
						{errors.confirmPassword && (
							<motion.div
								className="mt-2 text-rose-700"
								animate={{ y: 0 }}
								initial={{ y: 10 }}
							>
								{errors.confirmPassword.message}
							</motion.div>
						)}
					</div>
					<div>
						<Btn
							disabled={!isDirty}
							text="Mentés"
							clickEvent={() => console.log('update use')}
							customClasses={` w-full ${!isDirty ? 'btn-gray-2' : 'btn-dark'}`}
						/>
					</div>
				</form>
				{onAttempt && (
					<div className="absolute inset-0 flex justify-center items-center bg-site-1 bg-opacity-60 rounded-xl">
						<ContentLoader />
					</div>
				)}
			</div>
			<ProfileAvatar />
		</div>
	);
};

export default ProfileData;
