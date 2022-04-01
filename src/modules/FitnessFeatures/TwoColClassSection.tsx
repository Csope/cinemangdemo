import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import LinkBtn from '../../common/elements/buttons/LinkBtn';
import TransformedSwiper from '../../common/swiper/TransformedSwiper';
import { ButtonPropType } from '../../types';

interface PropType {
	classTitle: string;
	classDescription: string;
	imgSrcs: string[];
	buttonInfo: ButtonPropType;
	direction: 'text-img' | 'img-text';
	delay: number;
}

const TwoColClassSection = ({
	classTitle,
	classDescription,
	imgSrcs,
	buttonInfo,
	direction,
	delay,
}: PropType) => {
	const controls = useAnimation();
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.6,
	});

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
		if (!inView) {
			controls.start('hidden');
		}
	}, [controls, inView]);

	return (
		<div
			ref={ref}
			className={`flex items-center flex-col text-justify md:text-left px-4 md:px-0 ${
				direction === 'text-img' ? 'md:flex-row' : 'md:flex-row-reverse'
			}`}
		>
			<motion.div
				initial="hidden"
				animate={controls}
				className="w-full md:w-2/3"
				transition={{ type: 'spring', bounce: 0 }}
				variants={{
					hidden: {
						opacity: 0,
						x: direction === 'img-text' ? 100 : -100,
					},
					visible: {
						opacity: 1,
						x: 0,
					},
				}}
			>
				<h3 className={`h3 mb-4 text-center md:text-left`}>{classTitle}</h3>
				<div className="mb-12 md:mb-10 text-white leading-7">
					{classDescription}
				</div>
				<div className="text-center md:text-right mb-14 md:mb-0">
					<LinkBtn
						text={buttonInfo.text}
						href="FIXME:"
						customClasses="btn-light w-full md:w-auto"
					/>
				</div>
			</motion.div>
			<motion.div
				initial="hidden"
				animate={controls}
				className={`w-56 md:w-1/3 md:flex ${
					direction === 'img-text' ? 'md:justify-start' : 'md:justify-end'
				}`}
				transition={{ type: 'spring', bounce: 0 }}
				variants={{
					hidden: {
						opacity: 0,
						x: direction === 'img-text' ? -100 : 100,
					},
					visible: {
						opacity: 1,
						x: 0,
					},
				}}
			>
				<div className=" md:w-56 md:mr-10 md:ml-10">
					<TransformedSwiper initialSlide={1} imgSrcs={imgSrcs} delay={delay} />
				</div>
			</motion.div>
		</div>
	);
};

export default TwoColClassSection;
