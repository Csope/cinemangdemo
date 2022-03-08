import React from 'react';

interface TransformedImageProps {
	imgSrc: string;
	imgAlt: string;
	// rotate: 'vertical' | 'left-to-right' | 'right-to-left';
	transform: string;
}

const TransformedImage = ({
	imgSrc,
	imgAlt,
	transform,
}: TransformedImageProps) => {
	return (
		<div className={`w-full transformed-image-container`}>
			<img src={imgSrc} alt={imgAlt} style={{ transform }} />
			<div className="image-shadow"></div>
		</div>
	);
};

export default TransformedImage;
