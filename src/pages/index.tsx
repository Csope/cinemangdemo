import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
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
		<div>
			<div className="w-full pt-0 md:pt-6 pb-10">
				<div className="container ">
					<HeroSection />
				</div>
			</div>
			<TriangleDivider bgClass="bg-site-3" mTop={-40} />
			<TriangleDividerNextItem bgClass="bg-purple-linear">
				<div className="mt-10">
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
			<div className="w-full">
				<div className="bg-site-2 pt-10 md:pt-16 pb-12">
					<div className="container">
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
				<div className="pt-12 pb-12 bg-site-9">
					<div className="container">
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
				</div>

				<div className="bg-site-2 pt-12 pb-12">
					<div className="container">
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
			<TriangleDivider
				mTop={-155}
				bgClass="bg-site-11"
				customClasses="TriangleDivider--parallax"
			/>
			<TriangleDividerNextItem bgClass="bg-cian-linear" borderColor="#d3e6ea">
				<div className="mt-10">
					<h1 className="h1-shadow h1-shadow--cian">Cardio részleg</h1>
				</div>
			</TriangleDividerNextItem>
			<CardioSection />
			<CareerSection />
			<FormWithMap />
		</div>
	);
};

export default Home;
