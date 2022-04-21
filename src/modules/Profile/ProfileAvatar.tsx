import React, { useState } from 'react';
import ContentLoader from '../../common/elements/ContentLoader';
import * as Avatars from '../../common/icons/avatars/Avatars';
import { useUser } from '../../hooks';

const ProfileAvatar = () => {
	const { doUpdateAvatar, doSetUserState, user } = useUser();

	const avatarClick = async (iconName: string) => {
		const updateRes = await doUpdateAvatar(iconName);

		if (updateRes) {
			// @ts-ignore
			doSetUserState((prevUserData) => ({ ...prevUserData, avatar: iconName }));
		}
	};

	return (
		<div className="relative">
			<div className="bg-site-1 py-7 px-4 md:px-6 rounded-xl mb-8 flex flex-col ">
				<h1 className="text-xl md:text-2xl font-montserrat text-center text-site-4 italic font-black uppercase mb-3">
					Avatar
				</h1>

				<div>
					<div className="grid grid-cols-5 w-full justify-center items-center md:px-10 py-4 gap-3">
						{Object.keys(Avatars).map((key) => {
							return (
								<img
									key={key}
									// @ts-ignore
									src={Avatars[key].src}
									className={`${
										user?.avatar === key ? 'border-2 border-site-3' : ''
									} cursor-pointer rounded-full`}
									onClick={() => avatarClick(key)}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileAvatar;
