import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../../hooks';
import ProfileContent from '../../modules/Profile/ProfileContent';

const Profile = () => {
	const { status } = useUser();
	const router = useRouter();

	if (status === 'unauthenticated') {
		router.push('/');
		return null;
	}

	return (
		<div className="Profile page">
			<div className="container pb-10">
				<div>
					<h1 className="h1-shadow h1-shadow--purple text-center mb-8">
						Profil
					</h1>
				</div>
				<ProfileContent />
			</div>
		</div>
	);
};

export default Profile;
