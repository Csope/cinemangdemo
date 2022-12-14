import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import LinkBtn from '../../common/elements/buttons/LinkBtn';
import CardioBookIcon from '../../common/icons/fitness/CardioBookIcon';
import CardioBurnIcon from '../../common/icons/fitness/CardioBurnIcon';
import CardioGroupIcon from '../../common/icons/fitness/CardioGroupIcon';
import CardioHeartIcon from '../../common/icons/fitness/CardioHeartIcon';
import CardioMuscleIcon from '../../common/icons/fitness/CardioMuscleIcon';
import CardioTreadmillIcon from '../../common/icons/fitness/CardioTreadmillIcon';
import CardioWatchIcon from '../../common/icons/fitness/CardioWatchIcon';
import CardioWaterIcon from '../../common/icons/fitness/CardioWaterIcon';

const CardioSection = () => {
	const controls = useAnimation();
	const { ref, inView } = useInView({
		threshold: 0.2,
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
			className="Homepage-cardio-section bg-site-10 pt-4 pb-8"
			style={{ marginTop: -1 }}
		>
			<div className="container">
				<motion.div
					className="flex flex-col md:flex-row px-4 md:px-0 items-start gap-10 md:mt-6"
					initial="hidden"
					animate={controls}
					transition={{ type: 'spring', bounce: 0 }}
					variants={{
						hidden: {
							opacity: 0,
							y: 100,
						},
						visible: {
							opacity: 1,
							y: 0,
						},
					}}
				>
					<div className="w-full md:w-2/5 md:mb-8 leading-7">
						<div className="text-justify md:text-left" ref={ref}>
							Fitness termünkben új modern Mátrix géppark várja az edzeni
							vágyókat. Erősítő részlegünkön nem kifejezetten a nagy izom
							növelésére inkább a test formálására alkalmas súlyok találhatók
							így a hölgyek is kényelmesen tudják használni őket.
						</div>
						<div className="mt-12 text-center md:text-left">
							<LinkBtn
								text={'Vásárlás'}
								href="/prices"
								customClasses="btn-cian w-full md:w-auto"
							/>
						</div>
					</div>
					<div className="md:pl-10 w-full md:w-3/5 flex flex-col md:flex-row md:gap-4">
						<div className=" w-full md:w-1/2">
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-5">
								<CardioWatchIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								modern géppark
							</div>
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-5">
								<CardioBurnIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								szauna
							</div>
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-5">
								<CardioTreadmillIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								futópad
							</div>
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-5">
								<CardioWaterIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								büfé
							</div>
						</div>
						<div className="w-full md:w-1/2">
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-5">
								<CardioHeartIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								cardio részleg
							</div>
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-5">
								<CardioMuscleIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								erősítő részleg
							</div>
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-5">
								<CardioBookIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								270 m2
							</div>
							<div className="flex w-full justify-center md:justify-start items-center text-lg md:text-2xl mb-3">
								<CardioGroupIcon
									customClasses="w-8 h-8 mr-4"
									fillColor="#028d9a"
								/>
								jó közösség
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default CardioSection;
