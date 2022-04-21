import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

interface PropTypes {
	src: string;
	customClasses?: string;
}

const ParallaxBannerImage = ({ src, customClasses }: PropTypes) => {
	return (
		<ParallaxBanner
			layers={[{ image: src, speed: -14 }]}
			className={`aspect-[2/1] ${customClasses}`}
		/>
	);
};

export default ParallaxBannerImage;
