import { useRouter } from 'next/router';
import React from 'react';
import RegisterSection from '../../common/site/RegisterSection';
import { useUser } from '../../hooks';
import BgImage from '../../../public/images/climbers-bg.jpg';
import ClimbersImg from '../../../public/images/climbers.png';

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
				className="md:py-14 relative"
				style={{
					backgroundImage: `url(${BgImage.src})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<div className="container">
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:w-5/12">
							<h1 className="h1-shadow h1-shadow--blue py-8 md:py-0 text-center">
								Csatlakozz <br></br>
								hozzánk!
							</h1>
							<div>
								<img
									src={ClimbersImg.src}
									alt="climbers"
									className="hidden md:block absolute w-2/5 left-0 bottom-0"
								/>
							</div>
						</div>
						<div className="w-full md:w-7/12">
							<RegisterSection />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
