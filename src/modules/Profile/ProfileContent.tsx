import React from 'react';
import ProfileData from './ProfileData';
import ProfilePasses from './ProfilePasses';
import ProfileReservations from './ProfileReservations';

const ProfileContent = () => {
	return (
		<>
			<ProfileData />
			<ProfileReservations />
			<ProfilePasses />
		</>
	);
};

export default ProfileContent;
