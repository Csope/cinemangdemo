import React from 'react';
import ProfileData from './ProfileData';
import ProfilePasses from './ProfilePasses';
import ProfileReservations from './ProfileReservations';

const ProfileContent = () => {
	return (
		<div className="mx-4 md:mx-0">
			<ProfileData />
			<ProfileReservations />
			<ProfilePasses />
		</div>
	);
};

export default ProfileContent;
