import React from 'react';

type PropTypes = {
	text: string;
	checked: boolean;
	defaultClasses: string;
	activeClasses: string;
};

const RadioOption = ({
	text,
	checked,
	defaultClasses,
	activeClasses,
}: PropTypes) => {
	return (
		<div className="flex cursor-pointer">
			<div
				className={`${defaultClasses} ${checked ? activeClasses : ''}`}
			></div>
			<div>{text}</div>
		</div>
	);
};

export default RadioOption;
