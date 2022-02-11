import React from 'react';
import NormalDarkButton from '../../common/elements/buttons/NormalDarkButton';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import { FiAlertCircle } from 'react-icons/fi';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';

function FilteredClassesSwiperView() {
	return (
		<div className="FilteredClassesSwiperView">
			<div className="container pt-6">
				<FiveColSwiper
					initialSlide={3}
					imgSrcs={[
						'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
						'https://geocdn.fotex.net/static.sugarfitness.hu/files/1476/preview.jpg',
						'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
						'https://geocdn.fotex.net/static.sugarfitness.hu/files/993/preview.jpg',
						'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
					]}
				/>
			</div>

			<TriangleDivider mTop={-20} />
			<TriangleDividerNextItem>
				<h1 className="h1-shadow h1-shadow--white mt-4">Fitbox</h1>
			</TriangleDividerNextItem>

			<div className="bg-site-2 text-white pb-8">
				<div className="container">
					<div className="flex flex-col-reverse px-4 flex-wrap md:flex-row-reverse md:items-start lg:flex-row lg:flex-nowrap lg:gap-8">
						<div className="text-center lg:text-left mb-8 lg:basis-5/12">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
							atque perspiciatis odio animi veniam esse voluptas laudantium!
							Voluptate ab, vel commodi, facere vitae, debitis aliquam deleniti
							non inventore a consectetur?
						</div>
						<div className="mb-8 flex flex-col-reverse md:mb-0 md:flex-col md:basis-3/12 lg:basis-2/12">
							<div className="bg-site-8 md:mb-8 rounded-xl p-4 text-center">
								<div className="mb-4">
									<img
										className="rounded-xl"
										src="https://sugarfitness.hu/files/1264/preview.jpg"
									/>
								</div>
								<div className="leading-5 text-xl italic">
									<div>Pakucs</div>
									<div>Eta</div>
								</div>
							</div>
							<div className="mb-8 md:mb-0 text-center">
								<div className="inline-block bg-rose-500 rounded-full px">
									<FiAlertCircle className="mx-auto w-14 h-14" />
								</div>
								<div className="text-site-4 text- text-xl uppercase">
									Haladó
								</div>
							</div>
						</div>
						<div className="bg-site-8 rounded-xl p-4 text-center mt-4 md:mr-4 mb-8 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12">
							<div className="mb-4">
								<div className="text-site-4 uppercase">Oktató</div>
								<div className="text-white text-xl">Pakucs Eta</div>
							</div>
							<div className="mb-4">
								<div className="text-site-4 uppercase">Időtartam</div>
								<div className="text-white text-xl">17:00 - 17:45</div>
							</div>
							<div className="mb-4">
								<div className="text-site-4 uppercase">Helyszín</div>
								<div className="text-white text-xl">Impulse Terem</div>
							</div>
							<div className="mb-6">
								<div className="text-site-4 uppercase">Férőhelyek</div>
								<div className="text-white text-xl">16/32</div>
							</div>
							<div className="w-10/12 mx-auto">
								<NormalDarkButton
									text="Foglalás"
									customClasses="w-full"
									isLink={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FilteredClassesSwiperView;
