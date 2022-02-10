import React from 'react';

interface TransformedImageProps {
	imgSrc: string;
	imgAlt: string;
	rotate: 'vertical' | 'left-to-right' | 'right-to-left';
}

const TransformedImage = ({
	imgSrc,
	imgAlt,
	rotate,
}: TransformedImageProps) => {
	return (
		<div className={`w-full transformed-image-container ${rotate}`}>
			<img className={rotate} src={imgSrc} alt={imgAlt} />
			<div className="image-shadow"></div>
		</div>
	);
};

export default TransformedImage;
