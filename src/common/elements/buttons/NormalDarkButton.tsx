import Link from 'next/link';
import React from 'react';
import { ButtonPropType } from '../../../types';

const NormalDarkButton = ({
	text,
	customClasses,
	isLink,
	linkHref,
	appendBefore,
	clickEvent,
}: ButtonPropType) => {
	const classes = `btn-dark inline-block ${customClasses || ''}`;

	return isLink && linkHref ? (
		<Link href={linkHref || '/'}>
			<a className={classes} onClick={clickEvent}>
				{appendBefore ? appendBefore : null}
				{text}
			</a>
		</Link>
	) : (
		<button className={classes} onClick={clickEvent}>
			{appendBefore ? appendBefore : null}
			{text}
		</button>
	);
};

export default NormalDarkButton;
