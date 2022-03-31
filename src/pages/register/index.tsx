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
		<div className="Register_page page">
			<div
				className="py-14"
				style={{
					backgroundImage:
						'url(https://picjumbo.com/wp-content/uploads/blue-mountain-silhouettes.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<div className="container">
					<div className="flex">
						<div className="w-5/12">
							<h1 className="h1-shadow h1-shadow--blue text-center">
								Csatlakozz <br></br>
								hozzánk!
							</h1>
						</div>
						<div className="w-7/12">
							<RegisterSection />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
