import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import { Swiper as SwiperInstance } from 'swiper/types';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import FavoriteMark from '../site/FavoriteMark';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
	onSlideChange: (swiper: any) => void;
	hasFavorite?: boolean;
}

const FiveColSwiper = ({
	initialSlide,
	imgSrcs,
	onSlideChange,
	hasFavorite,
}: PropTypes) => {
	const [controlledSwiper, setControlledSwiper] =
		useState<SwiperInstance | null>(null);

	return (
		<div className="px-10 relative">
			<Swiper
				effect={'coverflow'}
				breakpoints={{
					576: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 5,
					},
				}}
				grabCursor={true}
				onSwiper={(swiperInstance) => setControlledSwiper(swiperInstance)}
				initialSlide={initialSlide || 0}
				centeredSlides={true}
				// slidesPerView={2}
				coverflowEffect={{
					rotate: 20,
					stretch: -40,
					depth: 100,
					modifier: 1,
					slideShadows: false,
				}}
				onSlideChangeTransitionEnd={onSlideChange}
				// loop={true}
				// pagination={true}
				modules={[EffectCoverflow]}
				className="FiveColSwiper"
				// preventClicks={false}
				allowTouchMove={false}
				slideToClickedSlide={true}
			>
				{imgSrcs.map((src, i) => (
					<SwiperSlide key={i}>
						<div className="relative">
							<img src={src} className="select-none" />
							{hasFavorite && <FavoriteMark id={src + i} />}
						</div>
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
