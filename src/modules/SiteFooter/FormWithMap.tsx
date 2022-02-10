import React from 'react';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';
import MapBg from '../../../public/images/map-bg.png';

const FormWithMap = () => {
	return (
		<div className="bg-site-2 FormWithMap px-4">
			<div className="container w-full flex flex-col-reverse md:flex-row gap-28 py-4 items-center">
				<div className="basis-full">
					<img src={MapBg.src} className="FormWithMap__map-img " />
				</div>
				<div className="w-full md:basis-full">
					<h1 className="h1-shadow h1-shadow--white mb-5 text-center md:text-left pt-4 md:pt-0">Kapcsolat</h1>
					<div className="mb-10">
						<input type="text" className="white-input" placeholder="Név" />
					</div>
					<div className="mb-5">
						<input
							type="text"
							className="white-input"
							placeholder="E-mail cím"
						/>
					</div>
					<div className="mb-6">
						<textarea className="white-textarea" />
					</div>
					<div className="text-center md:text-right">
						<NormalLightButton text="Küldés" customClasses="" isLink={false} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormWithMap;
