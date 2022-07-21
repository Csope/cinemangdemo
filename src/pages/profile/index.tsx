import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../../hooks';
import DeleteProfile from '../../modules/Profile/DeleteProfile';
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
			<div className="container md:pb-10">
				<div>
					<h1 className="h1-shadow h1-shadow--purple text-center mb-8 hidden md:block">
						Profil
					</h1>
				</div>
				<ProfileContent />

				<DeleteProfile />
			</div>
		</div>
	);
};

export default Profile;
