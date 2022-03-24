import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Btn from '../../common/elements/buttons/Btn';
import { useUser } from '../../hooks';
import ProfileAvatar from './ProfileAvatar';

const ProfileData = () => {
	const { user } = useUser();

	const {
		register,
		handleSubmit,
		getValues,
		setError,
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

		// setError('passwordConfirm', {
		// 	type: 'manual',
		// 	message: 'A két jelszó nem egyezik',
		// });
		// if()
		let pwDirty = false;

		if (
			dirtyFields.currentPassword ||
			dirtyFields.newPassword ||
			dirtyFields.confirmPassword
		) {
			pwDirty = true;

			let pwStageOneFailed = false;

			if (!dirtyFields.confirmPassword) {
				setError('confirmPassword', {
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
			if (!dirtyFields.confirmPassword) {
				setError('confirmPassword', {
					type: 'manual',
					message: 'Mező megadása kötelező',
				});

				pwStageOneFailed = true;
			}
		}

		console.log(pwDirty);
	};

	const onError = () => {
		console.log('err');
	};

	return (
		<div className="grid grid-cols-2 gap-10">
			<div className="bg-site-1 py-7 px-6 rounded-xl mb-8">
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
							customClasses={`btn-dark w-full ${!isDirty ? 'opacity-70' : ''}`}
						/>
					</div>
				</form>
			</div>
			<ProfileAvatar />
		</div>
	);
};

export default ProfileData;
