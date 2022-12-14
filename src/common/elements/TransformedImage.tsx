import React from 'react';

interface TransformedImageProps {
	imgSrc: string;
	imgAlt: string;
	transform: string;
}

const TransformedImage = ({
	imgSrc,
	imgAlt,
	transform,
}: TransformedImageProps) => {
	return (
		<div className={`w-full transformed-image-container`}>
			<img
				src={imgSrc}
				alt={imgAlt}
				style={{ transform }}
				className="cursor-pointer"
			/>
		</div>
	);
};

export default TransformedImage;
