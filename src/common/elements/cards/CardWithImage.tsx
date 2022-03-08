import React, { useEffect, useRef, useState } from 'react';

type PropTypes = {
	/**
	 * Source of the header image
	 */
	imgSrc: string;

	/**
	 * Body content
	 */
	bodyContent: JSX.Element;
};

const CardWithImage = ({ imgSrc, bodyContent }: PropTypes) => {
	const [imgMargin, setImgMargin] = useState(0);
	const ref = useRef<HTMLImageElement>(null);
	let pageHeight = window.innerHeight;

	const handleScroll = () => {
		const elementHeight = ref.current?.clientHeight || 0;
		const rect = ref.current?.getBoundingClientRect();
		const top = Math.round(rect?.top || 0);
		const bottom = pageHeight - (top + elementHeight);
		const diff =
			Math.round((Math.abs(top - bottom) / ((top + bottom) / 2)) * 100) / 100;

		let marginPixel;

		if (diff > 2) {
			marginPixel = 26;
		} else {
			marginPixel = 13 * diff;
		}

		if (top < bottom) {
			marginPixel *= -1;
		}

		setImgMargin(marginPixel);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="CardWithImage drop-shadow-md drop">
			<div>
				<div className="CardWithImage__header">
					<img
						style={{ top: imgMargin }}
						src={imgSrc}
						alt="card-image"
						ref={ref}
					/>
				</div>
				<div className="CardWithImage__body">{bodyContent}</div>
			</div>
		</div>
	);
};

export default CardWithImage;
