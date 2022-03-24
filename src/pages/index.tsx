import { useAnimation } from 'framer-motion';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import LinkBtn from '../common/elements/buttons/LinkBtn';
import ParallaxBannerImage from '../common/elements/ParallaxBannerImage';
import TriangleDivider from '../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../common/elements/TriangleDividerNextItem';
import CardioSection from '../modules/FitnessFeatures/CardioSection';
import CareerSection from '../modules/FitnessFeatures/CareerSection';
import TwoColClassSection from '../modules/FitnessFeatures/TwoColClassSection';
import HeroSection from '../modules/HeroSection/HeroSection';
import FormWithMap from '../modules/SiteFooter/FormWithMap';

const Home: NextPage = () => {
	const firstHeadingControl = useAnimation();
	const secondHeadingControl = useAnimation();
	const [fhRef, fhInView] = useInView({
		threshold: 1,
		rootMargin: '0px 0px -100px 0px',
	});
	const [shRef, shInView] = useInView({
		threshold: 1,
		rootMargin: '0px 0px -100px 0px',
	});

	useEffect(() => {
		if (fhInView) {
			firstHeadingControl.start('visible');
		}
		if (!fhInView) {
			firstHeadingControl.start('hidden');
		}
	}, [firstHeadingControl, fhInView]);

	useEffect(() => {
		if (shInView) {
			secondHeadingControl.start('visible');
		}
		if (!shInView) {
			secondHeadingControl.start('hidden');
		}
	}, [secondHeadingControl, shInView]);

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
				<LinkBtn
					text="Összes óratípus"
					customClasses="btn-dark mx-auto mt-3"
					href="/text"
				/>
			</div>
			<div className="w-full">
				<div className="bg-site-2 pt-10 md:pt-16 pb-12">
					<div className="container">
						<TwoColClassSection
							direction="text-img"
							classTitle={'Cardio'}
							classDescription={
								'A cardio edzés lényege, hogy felpörgeti a pulzust, így a szervezet több zsírt éget el. Egy komplex zsírégető edzés nem csak ugrálásból áll, hiszen az anyagcsere fokozásához az izomfejlesztés éppúgy fontos. Az a legjobb, ha pulzusnövelő és erősítő gyakorlatok váltják egymást.'
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
							classTitle={'Erősítő'}
							direction="img-text"
							classDescription={
								'Az erősítő edzés lényege, hogy megnöveli az izomtömeget, ezáltal átalakul a test felépítése és a szervezet anyagcseréje. Ezekkel az edzésformákkal javul a kondíciónk, alkalmas lehet tömegnövelésre, alakformálásra is.'
							}
							imgSrcs={[
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1476/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/993/preview.jpg',
							]}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Erősítő órák',
							}}
						/>
					</div>
				</div>

				<div className="bg-site-2 pt-12 pb-12">
					<div className="container">
						<TwoColClassSection
							direction="text-img"
							classTitle={'Mobilitás'}
							classDescription={
								'Ezeken az órákon kifejezetten a különböző izomcsoportokra fókuszálunk és növeljük testünk rugalmasságát is. Erősítő és nyújtó gyakorlatok is megtalálhatók bennük és kifejezetten a gerinc egészségére is nagy hangsúlyt fektetünk. Kezdők és idősebbek is bátran elkezdhetik vele a mozgást.'
							}
							imgSrcs={[
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/993/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/996/preview.jpg',
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg',
							]}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Mobilitás órák',
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
