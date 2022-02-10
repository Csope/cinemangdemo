import React from 'react';
import { UserIcon } from '@heroicons/react/solid';

const HeaderUser = (): JSX.Element => {
	return (
		<div className="cursor-pointer inline-block md:absolute md:right-10 md:-top-1/2 md:-translate-y-1/2 border-2 rounded-full p-3 bg-gray-300 text-gray-500 border-gray-500">
			<UserIcon className="w-4 h-4 md:w-8 md:h-8" />
		</div>
	);
};

export default HeaderUser;
