import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import TestImage from '../../../public/images/test.png';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
}

const TransformedSwiper = ({ initialSlide, imgSrcs }: PropTypes) => {
	return (
		<Swiper
			effect={'coverflow'}
			grabCursor={true}
			initialSlide={initialSlide || 0}
			centeredSlides={true}
			slidesPerView={3}
			coverflowEffect={{
				rotate: 45,
				stretch: 60,
				depth: 70,
				modifier: 1,
				slideShadows: false,
			}}
			pagination={true}
			modules={[EffectCoverflow]}
			className="TransformedSwiper"
		>
			{imgSrcs.map((src) => (
				<SwiperSlide>
					<img src={src} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default TransformedSwiper;
