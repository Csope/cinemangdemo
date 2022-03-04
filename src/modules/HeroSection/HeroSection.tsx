import React from 'react';
import TransformedImage from '../../common/elements/TransformedImage';
import test1 from '../../../public/images/20201.png';
import test2 from '../../../public/images/20211.png';

const HeroSection = () => {
	return (
		<div>
			<div>
				<TransformedImage
					rotate="vertical"
					imgAlt="image"
					imgSrc={'https://geocdn.fotex.net/static.sugarfitness.hu/files/1809'}
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 mt-3 md:-mt-14">
				<div>
					<TransformedImage
						rotate="left-to-right"
						imgAlt="image"
						imgSrc={test1.src}
					/>
				</div>

				<div>
					<TransformedImage
						rotate="right-to-left"
						imgAlt="image"
						imgSrc={test2.src}
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
