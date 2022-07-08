import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import { Swiper as SwiperInstance } from 'swiper/types';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import FavoriteMark from '../site/FavoriteMark';
import { useDebounce, useFavorites } from '../../hooks';
import { genSvgImageLoader } from '../../utils';
import Image from 'next/image';

interface PropTypes {
	initialSlide: number;
	imgSrcs: string[];
	onSlideChange: (swiper: any) => void;
	hasFavorite?: string[] | undefined;
	hasInfo?: string[] | undefined;
}

const svgBG = genSvgImageLoader(700, 475);

const FiveColSwiper = ({
	initialSlide,
	imgSrcs,
	onSlideChange,
	hasFavorite,
	hasInfo,
}: PropTypes) => {
	const [activeSlideValue, setActiveSlideValue] = useState(0);
	const debouncedActiveSlideValue = useDebounce(activeSlideValue, 200);
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

	useEffect(() => {
		onSlideChange(debouncedActiveSlideValue);
	}, [debouncedActiveSlideValue]);

	return (
		<div className="md:px-10 relative">
			<Swiper
				effect={'coverflow'}
				breakpoints={{
					0: {
						slidesPerView: 2,
						coverflowEffect: {
							rotate: 10,
							stretch: -20,
							depth: 100,
						},
					},
					576: {
						slidesPerView: 3,
						coverflowEffect: {
							rotate: 20,
							stretch: -40,
							depth: 100,
						},
					},
					768: {
						slidesPerView: 5,
						coverflowEffect: {
							rotate: 20,
							stretch: -40,
							depth: 100,
						},
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
				onSlideChange={(e: any) => setActiveSlideValue(e.snapIndex)}
				modules={[EffectCoverflow]}
				className="FiveColSwiper"
				allowTouchMove={true}
				slideToClickedSlide={true}
			>
				{imgSrcs.map((src, i) => (
					<SwiperSlide key={i}>
						<div className="relative">
							<div className="relative lazy-img-container lazy-img-container__swiper-x5">
								<Image
									src={src || svgBG}
									alt="card-img"
									layout="fill"
									className="lazy-img"
									placeholder="blur"
									blurDataURL={svgBG}
								/>
							</div>
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
				className="FiveColSwiper__prev-btn text-site-2 cursor-pointer hidden md:block"
				onClick={() => controlledSwiper?.slidePrev()}
			>
				<BsChevronCompactLeft />
			</div>
			<div
				className="FiveColSwiper__next-btn text-site-2 cursor-pointer hidden md:block"
				onClick={() => controlledSwiper?.slideNext()}
			>
				<BsChevronCompactRight />
			</div>
		</div>
	);
};

export default FiveColSwiper;
