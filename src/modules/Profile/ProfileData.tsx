import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from 'react-toastify';
import Btn from '../../common/elements/buttons/Btn';
import { useUser, useToasts } from '../../hooks';
import { UpdateUserType } from '../../types/UserType';
import ProfileAvatar from './ProfileAvatar';
import ContentLoader from '../../common/elements/ContentLoader';
import DatePicker from 'react-datepicker';
import { format, isEqual } from 'date-fns';
import { RadioGroup } from '@headlessui/react';
import RadioOption from '../../common/elements/form/RadioOption';

const ProfileData = () => {
	const { user, doUpdateUserData, doSetUserState } = useUser();
	const [gender, setGender] = useState<'F' | 'M' | 'X'>(user?.gender || 'X');
	const [birthdate, setBirthdate] = useState(
		user?.birth_date ? new Date(user.birth_date) : new Date()
	);
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
			birthdate: user?.birth_date,
		},
	});

	const [onAttempt, setOnAttempt] = useState(false);

	const onSubmit = async () => {
		if (
			!isDirty &&
			isEqual(
				birthdate,
				user?.birth_date ? new Date(user?.birth_date) : new Date()
			) &&
			user?.gender === gender
		)
			return;

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
		const _birthdate = format(birthdate, 'yyyy-MM-dd');

		const newData: UpdateUserType = pwDirty
			? {
					last_name: _lastname,
					first_name: _firstname,
					birth_date: _birthdate,
					gender: gender,
					password: getValues('currentPassword') as string,
					new_password: getValues('newPassword') as string,
			  }
			: {
					last_name: _lastname,
					first_name: _firstname,
					birth_date: _birthdate,
					gender: gender,
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
					birth_date: birthdate,
					gender,
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
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
			<div className="bg-site-1 py-7 px-4 md:px-6 rounded-xl md:mb-8 relative">
				<h1 className="text-xl md:text-2xl font-montserrat text-center text-site-4 italic font-black uppercase mb-3">
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
							{/* {valErrors.birthdate && (
								<motion.div
									animate={{ y: 0 }}
									initial={{ y: 10 }}
									className="mt-2 text-rose-700"
								>
									{valErrors.birthdate}
								</motion.div>
							)} */}
						</div>
					</div>
					<div className="mb-5  ml-1">
						<RadioGroup value={gender} onChange={setGender}>
							<RadioGroup.Label className="mb-1 block">Nem</RadioGroup.Label>

							<div className="flex">
								<RadioGroup.Option className="mr-4" value="F">
									{({ checked }) => (
										<RadioOption
											text="Nő"
											defaultClasses="w-5 h-5 mr-2 rounded-full bg-white"
											activeClasses="bg-site-19 border-4 border-white"
											checked={checked}
										/>
									)}
								</RadioGroup.Option>
								<RadioGroup.Option className="mr-4" value="M">
									{({ checked }) => (
										<RadioOption
											text="Férfi"
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
							disabled={
								!isDirty &&
								isEqual(
									birthdate,
									user?.birth_date ? new Date(user?.birth_date) : new Date()
								) &&
								user?.gender === gender
							}
							text="Mentés"
							clickEvent={() => true}
							customClasses={` w-full ${
								!isDirty &&
								user?.gender === gender &&
								isEqual(
									birthdate,
									user?.birth_date ? new Date(user?.birth_date) : new Date()
								)
									? 'btn-gray-2'
									: 'btn-dark'
							}`}
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
