import React from 'react';
import NormalDarkButton from '../../common/elements/buttons/NormalDarkButton';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import { FiAlertCircle } from 'react-icons/fi';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';
import ClassDescription from '../../common/site/ClassDescription';

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
					<ClassDescription />
				</div>
			</div>
		</div>
	);
}

export default FilteredClassesSwiperView;
