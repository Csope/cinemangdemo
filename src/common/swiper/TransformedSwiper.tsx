import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';
import { EffectCoverflow, Autoplay } from 'swiper';
import { genSvgImageLoader } from '../../utils';
import Image from 'next/image';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
	delay: number;
}

const svgBG = genSvgImageLoader(700, 475);

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
					<div className="relative lazy-img-container lazy-img-container__swiper-x3">
						<Image
							src={src || svgBG}
							alt="class-img"
							layout="fill"
							className="lazy-img"
							placeholder="blur"
							blurDataURL={svgBG}
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default TransformedSwiper;
