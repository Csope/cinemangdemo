import Link from 'next/link';
import React from 'react';
import { ButtonPropType } from '../../../types';

const NormalLightButton = ({
	text,
	customClasses,
	isLink,
	linkHref,
}: ButtonPropType) => {
	const classes = `btn-light inline-block ${customClasses || ''}`;

	return isLink && linkHref ? (
		<Link href={linkHref || '/'}>
			<a className={classes}>{text}</a>
		</Link>
	) : (
		<button className={classes}>{text}</button>
	);
};

export default NormalLightButton;
