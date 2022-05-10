import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';

import { EffectCoverflow, EffectCards, Autoplay } from 'swiper';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
	delay: number;
}

const TransformedSwiper = ({
	initialSlide,
	imgSrcs,
	delay = 4000,
}: PropTypes) => {
	const [controlledSwiper, setControlledSwiper] =
		useState<SwiperInstance | null>(null);

	return (
		<Swiper
			effect={'coverflow'}
			centeredSlides={true}
			grabCursor={false}
			initialSlide={initialSlide || 0}
			onSwiper={(swiperInstance) => setControlledSwiper(swiperInstance)}
			preventClicks={true}
			allowTouchMove={false}
			slidesPerView={3}
			loop={true}
			autoplay={{
				delay,
				disableOnInteraction: false,
			}}
			speed={700}
			coverflowEffect={{
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: false,
			}}
			pagination={false}
			modules={[EffectCoverflow, Autoplay]}
			className="TransformedSwiper"
		>
			{imgSrcs.map((src, i) => (
				<SwiperSlide key={src || i}>
					<img src={src} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default TransformedSwiper;
