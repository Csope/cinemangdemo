import { MouseEvent } from 'react';
export default interface ButtonPropType {
	text: string;
	customClasses?: string;
	isLink: boolean;
	linkHref?: string;
	appendBefore?: JSX.Element;
	clickEvent?: (e: MouseEvent) => void;
}
