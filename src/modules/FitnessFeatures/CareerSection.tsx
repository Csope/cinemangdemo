import React from 'react';
import GirlImage from '../../../public/images/karrier-girl.png';
import BgImage from '../../../public/images/karrier_bg.jpg';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';

const CareerSection = () => {
	return (
		<div
			className="pt-8 md:pt-4"
			style={{ backgroundImage: `url(${BgImage.src})` }}
		>
			<div className="container flex flex-col md:flex-row items-center px-4 md:px-0">
				<div className="basis-full gap-10 ">
					<h1 className="h1-shadow h1-shadow--white mb-4 text-center md:text-left">
						Karrier
					</h1>
					<div className="text-white leading-7 w-full md:w-3/4 text-center md:text-left">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
						praesentium, quia, excepturi blanditiis illo reiciendis id illum
						omnis alias, sed aut neque velit tenetur porro. Quidem illo esse
						ipsum aliquid, pariatur veritatis quasi reprehenderit iste ratione
						quibusdam delectus, aspernatur consectetur?
					</div>
					<div className="mt-10 mb-10 md:mb-0 text-center md:text-left">
						<NormalLightButton
							text={'Jelentkezés!'}
							isLink={true}
							linkHref={'/'}
						/>
					</div>
				</div>
				<div className="basis-full">
					<img src={GirlImage.src} />
				</div>
			</div>
		</div>
	);
};

export default CareerSection;
