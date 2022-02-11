import type { NextPage } from 'next';
import NormalDarkButton from '../common/elements/buttons/NormalDarkButton';
import ParallaxBannerImage from '../common/elements/ParallaxBannerImage';
import TriangleDivider from '../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../common/elements/TriangleDividerNextItem';
import CardioSection from '../modules/FitnessFeatures/CardioSection';
import CareerSection from '../modules/FitnessFeatures/CareerSection';
import TwoColClassSection from '../modules/FitnessFeatures/TwoColClassSection';
import HeroSection from '../modules/HeroSection/HeroSection';
import FormWithMap from '../modules/SiteFooter/FormWithMap';

const Home: NextPage = () => {
	return (
		<div className="bg-site-1">
			<div className=" bg-site-1 w-full pt-0 md:pt-6 pb-10">
				<div className="container ">
					<HeroSection />
				</div>
			</div>
			<TriangleDivider mTop={-40} />
			<TriangleDividerNextItem>
				<div className="bg-site-2 mt-10">
					<h1 className="h1-shadow h1-shadow--white">Csoportos órák</h1>
				</div>
			</TriangleDividerNextItem>
			<div className="text-center bg-site-2">
				<NormalDarkButton
					text="Összes óratípus"
					isLink={true}
					linkHref="/"
					customClasses="mt-5 md:mt-0"
				/>
			</div>
			<div className="bg-site-2 w-full">
				<div className="container pt-10 md:pt-16 pb-16">
					<div>
						<TwoColClassSection
							direction="text-img"
							classTitle={'Cardió'}
							classDescription={
								'Lorem ipsum dolor sit amet s duis blandit est feugiat, dis id at integer bibendum posuere etiam porttitor, mollis euismod dictumst cum sociis sagittis litora taciti, facilisis tortor diam enim eu lacus dui. Convallis diam etiam tempor elementum tempus iaculis donec condimentum egestas, curae vulputate justo ultricies sagittis tortor urna aptent facilisis'
							}
							imgSrcs={[
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/993/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/996/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
							]}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Cardió órák',
							}}
						/>
					</div>
					<div className="mt-16">
						<TwoColClassSection
							classTitle={'Cardió'}
							direction="img-text"
							classDescription={
								'Lorem ipsum dolor sit amet consectetuida nascetur ultrices rutrum. Sodales lacinia metus at integer bibendum posuere etiam porttitor, mollis euismod dictumst cum sociis sagittis litora taciti, facilisis tortor diam enim eu lacus dui. Convallis diam etiam tempor elementum tempus iaculis donec condimentum egestas, curae vulputate justo ultricies sagittis tortor urna aptent facilisis'
							}
							imgSrcs={[
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1476/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/993/preview.jpg',
							]}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Cardió órák',
							}}
						/>
					</div>

					<div className="pt-16">
						<TwoColClassSection
							direction="text-img"
							classTitle={'Cardió'}
							classDescription={
								'Lorem ipsum dolor sit amet s duis blandit est feugiat, dis id at integer bibendum posuere etiam porttitor, mollis euismod dictumst cum sociis sagittis litora taciti, facilisis tortor diam enim eu lacus dui. Convallis diam etiam tempor elementum tempus iaculis donec condimentum egestas, curae vulputate justo ultricies sagittis tortor urna aptent facilisis'
							}
							imgSrcs={[
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/993/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/996/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
							]}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Cardió órák',
							}}
						/>
					</div>
				</div>
			</div>
			<div className="bg-site-2 w-full">
				<ParallaxBannerImage
					height="500px"
					customClasses="parallax-banner-homepage"
					src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
				/>
			</div>
			<TriangleDivider mTop={-155} customClasses="TriangleDivider--parallax" />
			<TriangleDividerNextItem bgClass="bg-white-linear" borderColor="#e3d5ec">
				<div className="mt-10">
					<h1 className="h1-shadow h1-shadow--purple">Cardio részleg</h1>
				</div>
			</TriangleDividerNextItem>
			<CardioSection />
			<CareerSection />
			<FormWithMap />
		</div>
	);
};

export default Home;
