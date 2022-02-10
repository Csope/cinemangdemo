import React from 'react';
import TransformedImage from '../../common/elements/TransformedImage';
import TestImage from '../../../public/images/preview.jpeg';

const HeroSection = () => {
	return (
		<div>
			<div>
				<TransformedImage
					rotate="vertical"
					imgAlt="image"
					imgSrc={TestImage.src}
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 mt-3 md:-mt-14">
				<div>
					<TransformedImage
						rotate="left-to-right"
						imgAlt="image"
						imgSrc={
							'https://geocdn.fotex.net/static.sugarfitness.hu/files/1709/preview.jpg'
						}
					/>
				</div>

				<div>
					<TransformedImage
						rotate="right-to-left"
						imgAlt="image"
						imgSrc={
							'https://geocdn.fotex.net/static.sugarfitness.hu/files/1785/preview.jpg'
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
