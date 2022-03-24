import React, { useEffect } from 'react';
import CoupleImage from '../../../public/images/carrier-couple.png';
import BgImage from '../../../public/images/carrier-bg.jpg';
import { useParallax } from 'react-scroll-parallax';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import LinkBtn from '../../common/elements/buttons/LinkBtn';

const CareerSection = () => {
	const imgRef = useParallax<HTMLImageElement>({
		scale: [1, 1.35, 'easeInQuad'],
	});
	const controls = useAnimation();
	const { ref, inView } = useInView({
		threshold: 0.6,
		triggerOnce: true,
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
			className="pt-8 md:pt-0"
			style={{ backgroundImage: `url(${BgImage.src})` }}
		>
			<div className="container flex flex-col md:flex-row items-center px-4 md:px-0">
				<motion.div
					className="basis-full gap-10 "
					ref={ref}
					initial="hidden"
					transition={{ type: 'spring', bounce: 0 }}
					animate={controls}
					variants={{
						hidden: {
							opacity: 0,
							x: 100,
						},
						visible: {
							opacity: 1,
							x: 0,
						},
					}}
				>
					<h1 className="h1-shadow h1-shadow--gray mb-4 text-center md:text-left md:pt-8">
						Karrier
					</h1>
					<div className="text-gray-800 leading-7 w-full md:w-3/4 text-center md:text-left">
						A főváros jól megközelíthető pontján, a Sugár Üzletközpontban,
						modern környezetben és felszereltséggel, több mint negyven különböző
						óratípussal várja vendégeit a Sugár Fitness! Hatvan szakképzett,
						elhivatott oktató hét különböző teremben tart edzéseket a hét minden
						napján, cardio- és külön erősítő termünkben pedig tréning
						lehetőséget biztosítunk a személyi edzést előnyben részesítő
						vendégeink számára.
					</div>
					<div className="mt-10 mb-10 md:mb-0 text-center md:text-left md:pb-14">
						<LinkBtn
							text={'Jelentkezem!'}
							href="FIXME:"
							customClasses="btn-magenta"
						/>
					</div>
				</motion.div>
				<div className="basis-full mt-10 md:mt-0">
					<img
						className="ml-0 md:ml-10"
						src={CoupleImage.src}
						style={{ transformOrigin: 'bottom' }}
						ref={imgRef.ref}
					/>
				</div>
			</div>
		</div>
	);
};

export default CareerSection;
