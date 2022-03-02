import Link from 'next/link';
import React from 'react';
import { ButtonPropType } from '../../../types';

const NormalGrayButton = ({
	text,
	customClasses,
	isLink,
	linkHref,
}: ButtonPropType) => {
	const classes = `btn-gray inline-block ${customClasses || ''}`;

	return isLink && linkHref ? (
		<Link href={linkHref || '/'}>
			<a className={classes}>{text}</a>
		</Link>
	) : (
		<button className={classes}>{text}</button>
	);
};

export default NormalGrayButton;
