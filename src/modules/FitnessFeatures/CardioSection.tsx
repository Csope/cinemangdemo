import React from 'react';
import { ImSpoonKnife } from 'react-icons/im';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';

const CardioSection = () => {
	return (
		<div className="Homepage-cardio-section bg-site-1 py-10">
			<div className="container">
				<div className="flex flex-col md:flex-row px-4 items-center gap-10">
					<div className="w-full md:w-2/5 mb- md:mb-10 leading-7">
						<h3 className="h3 text-center md:text-right">Élet, erō, egészség!</h3>
						<div className='text-center md:text-right'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Praesentium adipisci, earum explicabo deleniti quas nobis vel,
							ratione voluptatem eligendi placeat exercitationem dolorem
							voluptates quaerat. Voluptas?
						</div>
						<div className="mt-10 text-center md:text-left">
							<NormalLightButton
								text={'Vásárlás'}
								isLink={true}
								linkHref={'/'}
							/>
						</div>
					</div>
					<div className="w-full md:w-3/5 flex gap-4">
						<div className=" w-1/2">
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								szauna
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								bufe
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								futogepek
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								33-fele edzogep
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								1500 m2
							</div>
						</div>
						<div className=" w-1/2">
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								szauna
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								bufe
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								futogepek
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								33-fele edzogep
							</div>
							<div className="flex items-center text-lg md:text-2xl mb-3">
								<div className="bg-site-4 p-2 rounded mr-3">
									<ImSpoonKnife color="white" />
								</div>
								1500 m2
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardioSection;
