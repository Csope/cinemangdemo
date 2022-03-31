import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';

import { EffectCards, Autoplay } from 'swiper';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
}

const TransformedSwiper = ({ initialSlide, imgSrcs }: PropTypes) => {
	const [controlledSwiper, setControlledSwiper] =
		useState<SwiperInstance | null>(null);

	return (
		<Swiper
			effect={'cards'}
			grabCursor={false}
			initialSlide={initialSlide || 0}
			onSwiper={(swiperInstance) => setControlledSwiper(swiperInstance)}
			// centeredSlides={true}
			// slidesPerView={3}
			// coverflowEffect={{
			// 	rotate: 45,
			// 	stretch: 60,
			// 	depth: 70,
			// 	modifier: 1,
			// 	slideShadows: false,
			// }}
			// loop={true}
			// loopFillGroupWithBlank={true}
			preventClicks={true}
			allowTouchMove={false}
			cardsEffect={{
				slideShadows: false,
			}}
			autoplay={{
				delay: 4000,
				disableOnInteraction: false,
			}}
			modules={[EffectCards, Autoplay]}
			className="TransformedSwiper"
		>
			{imgSrcs.map((src) => (
				<SwiperSlide key={src}>
					<img src={src} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default TransformedSwiper;
