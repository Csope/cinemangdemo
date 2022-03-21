import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';
import TransformedSwiper from '../../common/swiper/TransformedSwiper';
import { ButtonPropType } from '../../types';

interface PropType {
	classTitle: string;
	classDescription: string;
	imgSrcs: string[];
	buttonInfo: ButtonPropType;
	direction: 'text-img' | 'img-text';
}

const TwoColClassSection = ({
	classTitle,
	classDescription,
	imgSrcs,
	buttonInfo,
	direction,
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
			className={`flex items-center flex-col text-center md:text-left px-10 md:px-4 ${
				direction === 'text-img' ? 'md:flex-row' : 'md:flex-row-reverse'
			}`}
		>
			<motion.div
				initial="hidden"
				animate={controls}
				className="w-full md:w-1/2"
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
				<h3 className="h3 mb-4">{classTitle}</h3>
				<div className="mb-10 text-white leading-7">{classDescription}</div>
				<div className="text-center md:text-right">
					<NormalLightButton
						text={buttonInfo.text}
						isLink={buttonInfo.isLink}
						linkHref={buttonInfo.linkHref}
						customClasses="mb-14 md:mb-0"
					/>
				</div>
			</motion.div>
			<motion.div
				initial="hidden"
				animate={controls}
				className="w-full md:w-1/2"
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
				<TransformedSwiper initialSlide={1} imgSrcs={imgSrcs} />
			</motion.div>
		</div>
	);
};

export default TwoColClassSection;
