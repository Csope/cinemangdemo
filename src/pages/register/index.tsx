import { useRouter } from 'next/router';
import React from 'react';
import RegisterSection from '../../common/site/RegisterSection';
import { useUser } from '../../hooks';

const Register = () => {
	const { status } = useUser();
	const router = useRouter();

	if (status === 'authenticated') {
		router.push('/');
		return null;
	}

	return (
		<div className="Register_page page pb-12">
			<div>
				<h1 className="h1-shadow h1-shadow--purple text-center mb-8">
					Regisztráció
				</h1>
			</div>
			<RegisterSection />
		</div>
	);
};

export default Register;
