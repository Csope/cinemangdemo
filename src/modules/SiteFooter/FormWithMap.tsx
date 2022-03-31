import React from 'react';
import MapBg from '../../../public/images/map-bg.png';
import LinkBtn from '../../common/elements/buttons/LinkBtn';

const FormWithMap = () => {
	return (
		<div className="bg-site-14 FormWithMap px-4">
			<div className="container w-full flex flex-col-reverse md:flex-row gap-10 md:gap-28 items-center">
				<div className="basis-full">
					<img src={MapBg.src} className="FormWithMap__map-img " />
				</div>
				<div className="w-full md:basis-full py-6 md:py-14">
					<h1 className=" h1-shadow h1-shadow--white-2 mb-5 text-center md:text-left pt-6 md:pt-0">
						Kapcsolat
					</h1>
					<div className="mb-5">
						<label htmlFor="name" className="text-white mb-1 block">
							Név
						</label>
						<input type="text" id="name" className="white-input" />
					</div>
					<div className="mb-5">
						<label htmlFor="email" className="text-white mb-1 block">
							E-mail cím
						</label>
						<input type="text" id="email" className="white-input" />
					</div>
					<div className="mb-8 md:mb-6">
						<label htmlFor="message" className="text-white mb-1 block">
							Üzenet szövege
						</label>
						<textarea
							id="message"
							className="white-textarea"
							style={{ minHeight: 170 }}
						/>
					</div>
					<div className="text-center md:text-right">
						<LinkBtn
							text="Küldés"
							customClasses="btn-gray w-full md:w-auto"
							href="FIXME:"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormWithMap;
