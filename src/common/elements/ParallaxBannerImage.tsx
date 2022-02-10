import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

interface PropTypes {
	src: string;
	customClasses?: string;
	height: string;
}

const ParallaxBannerImage = ({ src, customClasses, height }: PropTypes) => {
	return (
		<ParallaxBanner
			layers={[{ image: src, speed: -30 }]}
			className={`aspect-[2/1] ${customClasses}`}
			style={{
				height,
			}}
		/>
	);
};

export default ParallaxBannerImage;
