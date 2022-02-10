import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import { Swiper as SwiperInstance } from 'swiper/types';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
}

const FiveColSwiper = ({ initialSlide, imgSrcs }: PropTypes) => {
	const [controlledSwiper, setControlledSwiper] =
		useState<SwiperInstance | null>(null);

	return (
		<div className="px-10 relative">
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				onSwiper={(swiperInstance) => setControlledSwiper(swiperInstance)}
				initialSlide={initialSlide || 0}
				centeredSlides={true}
				slidesPerView={5}
				coverflowEffect={{
					rotate: 20,
					stretch: -40,
					depth: 100,
					modifier: 1,
					slideShadows: false,
				}}
				loop={true}
				pagination={true}
				modules={[EffectCoverflow]}
				className="FiveColSwiper"
			>
				{imgSrcs.map((src, i) => (
					<SwiperSlide key={i}>
						<img src={src} />
					</SwiperSlide>
				))}
			</Swiper>

			<div
				className="FiveColSwiper__prev-btn text-site-2 cursor-pointer"
				onClick={() => controlledSwiper?.slidePrev()}
			>
				<BsChevronCompactLeft />
			</div>
			<div
				className="FiveColSwiper__next-btn text-site-2 cursor-pointer"
				onClick={() => controlledSwiper?.slideNext()}
			>
				<BsChevronCompactRight />
			</div>
		</div>
	);
};

export default FiveColSwiper;
