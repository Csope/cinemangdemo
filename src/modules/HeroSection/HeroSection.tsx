import React, { useEffect, useRef, useState } from 'react';
import TransformedImage from '../../common/elements/TransformedImage';
// import test1 from '../../../public/images/cks_kezdoBerlet.jpg';
// import test2 from '../../../public/images/cks_ujraNyitva2.jpg';
// import test3 from '../../../public/images/cks_villam12.jpg';
import test1 from '../../../public/images/banners/1.jpeg';
import test2 from '../../../public/images/banners/2.jpeg';
import test3 from '../../../public/images/banners/3.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination, Autoplay } from 'swiper';

type PropTypes = {
	banners?: {
		id: number;
		target_url: string;
		type: number;
		picture_url: string;
	}[];
};

const HeroSection = ({ banners }: PropTypes) => {
	const firstPicRef = useRef<HTMLInputElement>(null);
	const [degree, setDegree] = useState({
		first: 0,
	});
const array = [1,2,3]
	const transformImageOnScroll = () => {
		const firstPicTop = firstPicRef.current?.offsetTop;
		const firstPicHeight = firstPicRef.current?.clientHeight;
		const scrollPosition = window.pageYOffset;

		if (firstPicHeight && firstPicTop) {
			const firstPicMaxVisiblePxFromTop = firstPicTop + firstPicHeight;

			const firstPicScrollInPercentage =
				(scrollPosition / firstPicMaxVisiblePxFromTop) * 100;

			const firstPicDegreeInPercentage = firstPicScrollInPercentage / 5;

			if (firstPicDegreeInPercentage > 18) {
				setDegree((prev) => {
					return {
						...prev,
						first: 18,
					};
				});
			} else {
				setDegree((prev) => {
					return {
						...prev,
						first: firstPicDegreeInPercentage,
					};
				});
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', transformImageOnScroll);

		return () => window.removeEventListener('scroll', transformImageOnScroll);
	}, []);

	return (
		<>
			<div
				className="hidden md:block"
				style={{ marginBottom: `-${8 * degree.first}px` }}
			>
				{/* {banners[0] && ( */}
					<div ref={firstPicRef}>
						<TransformedImage
							imgAlt="image"
							imgSrc={test1.src}
							transform={`rotateX(-${3 + degree.first * 0.8}deg) scale(${
								0.95 - degree.first / 300
							})`}
						/>
					</div>
				{/* )} */}

				<div className="grid grid-cols-1 sm:grid-cols-2 mt-3 md:-mt-10">
					{/* {banners[1] && ( */}
						<div>
							<TransformedImage
								imgAlt="image"
								imgSrc={test2.src}
								transform={`rotateY(3deg) rotateX(-${
									9 + degree.first * 1.2
								}deg) rotateZ(-${3 + degree.first / 3}deg) scale(${
									0.94 - degree.first / 100
								}) translateX(${15 + degree.first * 0.9}px) translateY(${
									4 + -10 * degree.first
								}px)`}
							/>
						</div>
					{/* )} */}

					{/* {banners[2] && ( */}
						<div>
							<TransformedImage
								imgAlt="image"
								imgSrc={test3.src}
								transform={`rotateY(-3deg) rotateX(-${
									9 + degree.first * 1.2
								}deg) rotateZ(${3 + degree.first / 3}deg) scale(${
									0.94 - degree.first / 100
								}) translateX(-${15 + degree.first * 0.9}px) translateY(${
									4 + -10 * degree.first
								}px)`}
							/>
						</div>
					{/* )} */}
				</div>
			</div>

			<div className="md:hidden">
				<div className="w-full p-4">
					<Swiper
						grabCursor={true}
						effect={'creative'}
						creativeEffect={{
							prev: {
								shadow: false,
								translate: [0, 0, -400],
							},
							next: {
								translate: ['100%', 0, 0],
							},
						}}
						loop={true}
						modules={[EffectCreative, Pagination, Autoplay]}
						className="HeroSwiper"
						pagination={true}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
					>
						
						{array.map((array) => (
							<SwiperSlide key={1}>
								<div className={`w-full transformed-image-container`}>
									<img src={''} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
};

export default HeroSection;
