import { Dialog } from '@headlessui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useUser } from '../../hooks';

interface PropTypes {
	showLogin: boolean;
	hideLogin: () => void;
}

const LoginSection = ({ showLogin, hideLogin }: PropTypes) => {
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		formState: { errors },
	} = useForm();

	const { status, doSignInCredentials } = useUser();

	const onSubmit = async () => {
		const [email, password] = getValues(['email', 'password']);
		const attempt = await doSignInCredentials(email, password);

		console.log(attempt);
	};

	const onError = () => console.log(errors);

	return (
		<Dialog
			open={showLogin}
			onClose={() => hideLogin()}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay
					className="fixed inset-0 opacity-60"
					style={{ backgroundColor: '#280935' }}
				/>

				<div className="relative w-96">
					<div className="px-4 bg-site-8 py-3">
						<div className="container relative">
							<h1 className="text-center h1-shadow h1-shadow--white">
								Bejelentkezés
							</h1>
						</div>
					</div>
					<div className="bg-site-1 py-8">
						<div className="p-4 text-center">
							<form onSubmit={handleSubmit(onSubmit, onError)}>
								<div className="mb-5">
									<label htmlFor="">Email</label>
									<input
										type="email"
										className="w-full"
										// value="doncica86@gmail.com"
										{...register('email')}
									/>
								</div>
								<div className="mb-5">
									<label htmlFor="">Jelszó</label>
									<input
										type="password"
										className="w-full"
										// value="12345678Aa"
										{...register('password', { required: true, minLength: 8 })}
									/>
								</div>
								<div>
									<input type="submit" className="btn-dark" value="Login" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default LoginSection;
