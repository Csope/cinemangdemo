import React from 'react';
import * as Avatars from '../../common/elements/icons/Avatars';

const ProfileAvatar = () => {
	const avatarClick = () => {
		console.log('avatar click');
	};

	return (
		<div>
			<div className="bg-site-1 py-7 px-6 rounded-xl mb-8 flex flex-col">
				<h1 className="text-2xl text-center text-site-4 italic font-black uppercase mb-3">
					Avatar
				</h1>

				<div>
					<div className="grid grid-cols-5 w-full justify-center items-center px-10 py-4 gap-3">
						{Object.keys(Avatars).map((key) => {
							return (
								<img
									key={key}
									// @ts-ignore
									src={Avatars[key].src}
									className="cursor-pointer"
									onClick={avatarClick}
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
