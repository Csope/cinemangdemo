import React from 'react';
import CoupleImage from '../../../public/images/carrier-couple.png';
import BgImage from '../../../public/images/carrier-bg.jpg';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';
import NormalGrayButton from '../../common/elements/buttons/NormalGrayButton';
import NormalMagentaButton from '../../common/elements/buttons/NormalMagentaButton';

const CareerSection = () => {
	return (
		<div
			className="pt-8 md:pt-4"
			style={{ backgroundImage: `url(${BgImage.src})` }}
		>
			<div className="container flex flex-col md:flex-row items-center px-4 md:px-0">
				<div className="basis-full gap-10 ">
					<h1 className="h1-shadow h1-shadow--gray mb-4 text-center md:text-left">
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
					<div className="mt-10 mb-10 md:mb-0 text-center md:text-left">
						<NormalMagentaButton
							text={'Jelentkezés!'}
							isLink={true}
							linkHref={'/'}
						/>
					</div>
				</div>
				<div className="basis-full mt-10 md:mt-0">
					<img
						className="ml-0 md:ml-10"
						src={CoupleImage.src}
						style={{ transform: 'scale(1.1)', transformOrigin: 'bottom' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default CareerSection;
