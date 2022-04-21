import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';

import { EffectCards, Autoplay } from 'swiper';

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
			effect={'cards'}
			grabCursor={false}
			initialSlide={initialSlide || 0}
			onSwiper={(swiperInstance) => setControlledSwiper(swiperInstance)}
			preventClicks={true}
			allowTouchMove={false}
			cardsEffect={{
				slideShadows: false,
			}}
			autoplay={{
				delay,
				disableOnInteraction: false,
			}}
			speed={700}
			modules={[EffectCards, Autoplay]}
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
