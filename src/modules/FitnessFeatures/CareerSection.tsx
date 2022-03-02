import React from 'react';
import CoupleImage from '../../../public/images/carrier-couple.png';
import BgImage from '../../../public/images/carrier-bg.jpg';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';
import NormalGrayButton from '../../common/elements/buttons/NormalGrayButton';

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
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
						praesentium, quia, excepturi blanditiis illo reiciendis id illum
						omnis alias, sed aut neque velit tenetur porro. Quidem illo esse
						ipsum aliquid, pariatur veritatis quasi reprehenderit iste ratione
						quibusdam delectus, aspernatur consectetur?
					</div>
					<div className="mt-10 mb-10 md:mb-0 text-center md:text-left">
						<NormalGrayButton
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
