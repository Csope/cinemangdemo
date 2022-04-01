import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import { Swiper as SwiperInstance } from 'swiper/types';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import FavoriteMark from '../site/FavoriteMark';
import { useFavorites } from '../../hooks';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
	onSlideChange: (swiper: any) => void;
	hasFavorite?: string[] | undefined;
	hasInfo?: string[] | undefined;
}

const FiveColSwiper = ({
	initialSlide,
	imgSrcs,
	onSlideChange,
	hasFavorite,
	hasInfo,
}: PropTypes) => {
	const [controlledSwiper, setControlledSwiper] =
		useState<SwiperInstance | null>(null);
	const { favorites } = useFavorites();

	const genFavorite = (favId: string) => {
		if (favorites.includes(favId)) {
			return (
				<div>
					<FavoriteMark id={favId} customClasses="absolute bottom-2 right-2" />
				</div>
			);
		}
	};

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
				coverflowEffect={{
					rotate: 20,
					stretch: -40,
					depth: 100,
					modifier: 1,
					slideShadows: false,
				}}
				onSlideChangeTransitionEnd={onSlideChange}
				modules={[EffectCoverflow]}
				className="FiveColSwiper"
				allowTouchMove={false}
				slideToClickedSlide={true}
			>
				{imgSrcs.map((src, i) => (
					<SwiperSlide key={i}>
						<div className="relative">
							<img src={src} className="select-none cursor-pointer" />
							{hasFavorite && genFavorite(hasFavorite[i])}
							{hasInfo && (
								<div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white bg-opacity-70 text-sm italic font-light px-5 py-1 rounded">
									{hasInfo[i]}
								</div>
							)}
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
