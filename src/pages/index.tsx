import axios from 'axios';
import { useAnimation } from 'framer-motion';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
import {
	ClassType,
	FrontPageResponseType,
	ReservationType,
	ResType,
} from '../types';
import { CategoryTypes } from '../types/ClassFilterTypes';
import CardioHeroImage from '../../public/images/cardio-hero.jpg';
import { useRouter } from 'next/router';
import ConfirmationPopup from '../common/site/ConfirmationPopup';
import { useActions, useToasts } from '../hooks';

type PropTypes = {
	banners: {
		id: number;
		target_url: string;
		type: number;
		picture_url: string;
	}[];
	classTypes: {
		cardio: ClassType[];
		mobility: ClassType[];
		amplifier: ClassType[];
	};
};

const Home: NextPage<PropTypes> = ({ banners, classTypes }: PropTypes) => {
	const {
		query: { delHash },
	} = useRouter();
	const { notify } = useToasts();
	const { doResignReservationWithHash } = useActions();
	const [showDelReservation, setShowDelReservation] = useState(false);
	const [delLoading, setDelLoading] = useState(false);
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

	const resignReservation = async (hash: string) => {
		try {
			setDelLoading(true);
			const res = await doResignReservationWithHash(hash);

			if (res.status) {
				notify('SUCCESS', res.message);
			} else {
				notify('ERROR', res.message);
			}

			setDelLoading(false);
			setShowDelReservation(false);
		} catch (error) {
			setDelLoading(false);
			notify('ERROR', 'Belső kiszolgálóhiba, próbáld újra később');
		}
	};

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

	useEffect(() => {
		if (delHash) {
			setShowDelReservation(true);
		}
	}, []);

	return (
		<div>
			<div className="w-full pt-0 md:pt-6 pb-10">
				<Link href="/sales-events" passHref>
					<div className="container ">
						<HeroSection banners={banners} />
					</div>
				</Link>
			</div>
			<TriangleDivider bgClass="bg-site-3" mTop={-40} />
			<TriangleDividerNextItem bgClass="bg-purple-linear">
				<div className="mt-10 hidden md:block ">
					<h1 className="h1-shadow h1-shadow--white">Csoportos órák</h1>
				</div>
			</TriangleDividerNextItem>
			<div
				className="bg-site-2 md:hidden pb-3 pt-4"
				style={{ marginBottom: -2 }}
			>
				<h1 className="h1-shadow text-center h1-shadow--white">
					Csoportos órák
				</h1>
			</div>
			<div className="text-center bg-site-2 px-4 md:px-0 pb-12 md:pb-0">
				<LinkBtn
					text="Összes óratípus"
					customClasses="btn-dark mx-auto mt-3 w-full md:w-auto"
					href="/timetable"
				/>
			</div>
			<div className="w-full">
				<div className="bg-site-9 md:bg-site-2 pt-9 pb-12 md:pt-16 md:pb-12">
					<div className="container">
						<TwoColClassSection
							delay={4000}
							direction="text-img"
							classTitle={'Cardio'}
							classDescription={
								'A cardio edzés lényege, hogy felpörgeti a pulzust, így a szervezet több zsírt éget el. Egy komplex zsírégető edzés nem csak ugrálásból áll, hiszen az anyagcsere fokozásához az izomfejlesztés éppúgy fontos. Az a legjobb, ha pulzusnövelő és erősítő gyakorlatok váltják egymást.'
							}
							imgSrcs={
								classTypes?.cardio?.map((_class) => _class.preview_url) || []
							}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Cardió órák',
							}}
							linkHref={`/timetable?s=category&v=${CategoryTypes.CARDIO}`}
						/>
					</div>
				</div>
				<div className="pt-10 pb-12 md:pt-12 md:pb-12 bg-site-2 md:bg-site-9">
					<div className="container">
						<TwoColClassSection
							delay={5000}
							classTitle={'Erősítő'}
							direction="img-text"
							classDescription={
								'Az erősítő edzés lényege, hogy megnöveli az izomtömeget, ezáltal átalakul a test felépítése és a szervezet anyagcseréje. Ezekkel az edzésformákkal javul a kondíciónk, alkalmas lehet tömegnövelésre, alakformálásra is.'
							}
							imgSrcs={
								classTypes?.amplifier?.map((_class) => _class.preview_url) || []
							}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Erősítő órák',
							}}
							linkHref={`/timetable?s=category&v=${CategoryTypes.AMPLIFIER}`}
						/>
					</div>
				</div>

				<div className="bg-site-9 md:bg-site-2 pt-10 pb-12">
					<div className="container">
						<TwoColClassSection
							delay={4500}
							direction="text-img"
							classTitle={'Mobilitás'}
							classDescription={
								'Ezeken az órákon kifejezetten a különböző izomcsoportokra fókuszálunk és növeljük testünk rugalmasságát is. Erősítő és nyújtó gyakorlatok is megtalálhatók bennük és kifejezetten a gerinc egészségére is nagy hangsúlyt fektetünk. Kezdők és idősebbek is bátran elkezdhetik vele a mozgást.'
							}
							imgSrcs={
								classTypes?.mobility?.map((_class) => _class.preview_url) || []
							}
							buttonInfo={{
								isLink: true,
								linkHref: '/',
								text: 'Mobilitás órák',
							}}
							linkHref={`/timetable?s=category&v=${CategoryTypes.MOBILITY}`}
						/>
					</div>
				</div>
			</div>
			<div className="bg-site-9 md:bg-site-2 w-full">
				<ParallaxBannerImage
					customClasses="parallax-banner-homepage"
					src={CardioHeroImage.src}
				/>
			</div>
			<TriangleDivider
				mTop={-155}
				bgClass="bg-site-11"
				customClasses="TriangleDivider--parallax"
			/>
			<TriangleDividerNextItem bgClass="bg-cian-linear" borderColor="#d3e6ea">
				<div className="mt-10 hidden md:block">
					<h1 className="h1-shadow h1-shadow--cian">Cardio és Erősítő</h1>
				</div>
			</TriangleDividerNextItem>
			<div className="bg-site-10 md:hidden pb-3  pt-4">
				<h1 className="h1-shadow text-center h1-shadow--cian">
					Cardio és Erősítő
				</h1>
			</div>
			<CardioSection />
			<CareerSection />
			<FormWithMap />

			<ConfirmationPopup
				show={showDelReservation}
				cancelAction={() => setShowDelReservation(false)}
				confirmAction={() => resignReservation((delHash as string) || '')}
				title="Megerősítés"
				text="Biztos, hogy le szeretnéd mondani a foglalásod?"
				cancelText="Mégsem"
				confirmText="Lemondás"
				loading={delLoading}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const {
			data: {
				data: { frontpage },
			},
		} = await axios.get<ResType<FrontPageResponseType>>(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/page_data/frontpage`
		);

		return {
			props: {
				banners: frontpage?.banners || [],
				classTypes: frontpage?.class_types || [],
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {
				banners: [],
				classTypes: [],
			},
		};
	}
};

export default Home;
