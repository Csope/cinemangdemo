import React from 'react';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';

type PropTypes = {
	show: boolean;
	customClasses?: string;
	clickEvent: (e: any) => void;
};

const PasswordVisibilityIcon = ({
	clickEvent,
	show,
	customClasses,
}: PropTypes) => {
	return (
		<div
			onClick={clickEvent}
			className={`cursor-pointer ${customClasses || ''}`}
		>
			{show ? (
				<div>
					<BiHide />
				</div>
			) : (
				<div>
					<BiShow />
				</div>
			)}
		</div>
	);
};

export default PasswordVisibilityIcon;
