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
import VideoBg from '../common/elements/VideoBg';
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
import { useGetFrontpageData } from '../queries';
import ContentLoader from '../common/elements/ContentLoader';
import IconCard from '../common/icons/IconCard';
import IconList from '../common/icons/IconList';
import DateFilter from '../modules/ClassFilter/DateFilter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import FiveColSwiper from '../common/swiper/FiveColSwiper';
import Cinema from '../../public/norman.jpeg';
import { motion } from 'framer-motion';


import { useQuery } from 'react-query';
import SimpleButton from '../common/elements/buttons/SimpleButton';
import CardWithImage from '../common/elements/cards/CardWithImage';
import MovieList from './list';
import { ViewList } from '../types/ClassFilterTypes';
import { useClassFilter, useSelectedSession, useSiteStates } from '../hooks';
import FilterView from './filter';
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import StartTimeFilter from '../modules/ClassFilter/StartTimeFilter';


// type PropTypes = {
// 	banners: {
// 		id: number;
// 		target_url: string;
// 		type: number;
// 		picture_url: string;
// 	}[];
// 	classTypes: {
// 		cardio: ClassType[];
// 		mobility: ClassType[];
// 		amplifier: ClassType[];
// 	};
// };

const Home: NextPage = () => {

	const {
		isLoading,
		data: { frontpage },
	} = useGetFrontpageData();
	const {
		query: { delHash },
	} = useRouter();
	const { notify } = useToasts();
	const { doResignReservationWithHash } = useActions();
	const [showDelReservation, setShowDelReservation] = useState(false);
	const [delLoading, setDelLoading] = useState(false);
	let [filter, setFilter] = useState('card');
	const testArray = [1, 2, 3, 4, 5];
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

	if (isLoading) {
		return (
			<div className="w-full mt-10 mb-20 flex justify-center">
				<ContentLoader />
			</div>
		);
	}

	return (
		<div className='relative'>
			<div className="w-full pt-0 md:pt-6 pb-10">
				<Link href="/sales-events" passHref>
					<div className="container">
						{/* {frontpage?.banners && <HeroSection banners={frontpage.banners} />} */}
						<HeroSection />
					</div>
				</Link>
			</div>
			<TriangleDivider bgClass="bg-site-3" mTop={-40} />
			<TriangleDividerNextItem bgClass="bg-gray-linear">
				<div className="mt-16 md:block ">
					<h1 className="h1-shadow">Moziműsor</h1>
				</div>
			</TriangleDividerNextItem>
			{/* <div
				className="bg-site-2 md:hidden pb-3 pt-4"
				style={{ marginBottom: -2 }}
			>
				<h1 className="h1-shadow text-center h1-shadow--white">
					Csoportos órák
				</h1>
			</div> */}
			<div className="flex justify-center gap-2 bg-site-2 px-4 md:px-0 pb-12 md:pb-0">
				{/* <LinkBtn
					text="Összes óratípus"
					customClasses="btn-dark mx-auto mt-3 w-full md:w-auto"
					href="/timetable"
				/> */}
				{/* Keresō form ../../common/form mappapaba csinalni egy componenst */}
				<div className="px-3 py-2 rounded-full cursor-pointer bg-site-4">
					<FeatherIcon icon="percent"/>
				</div>
				<div className="px-3 py-2 rounded-full cursor-pointer bg-site-4">
					<FeatherIcon icon="star"/>
				</div>
				<input className="w-1/4 block rounded-full py-1 pl-10 pr-7" style={{ border: "1px solid #5f698b" }}
					type="search" name="search" placeholder="Keresés" />

				<FilterView filter={filter} doAction={setFilter} />
			</div>
			<div className='Trainers_page page bg-site-2'>
				<div className='container'>
					<div className='md:px-10 relative'>
						<DateFilter />
					</div>
				</div>
			</div>
			<div className='bg-site-2 flex justify-center pb-10 pt-5'>
				<StartTimeFilter/>
			</div>
			{filter == 'card' && <div className="Trainers_page page bg-site-2 pb-10 border-b-2">
				<div className="mb-8 container">

					{isLoading ? (
						<div className="flex items-center justify-center pt-20 pb-28">
							<ContentLoader />
						</div>
					) : (
						<FiveColSwiper
							initialSlide={5}
							onSlideChange={(index: number) => {
							}}
							imgSrcs={[Cinema.src, Cinema.src, Cinema.src, Cinema.src, Cinema.src]
							}
						/>
					)}
				</div>

				{/* <TriangleDivider bgClass="bg-site-6" mTop={-20} /> */}

				<TriangleDividerNextItem customClass='flex-col pb-10' height={250} mTop={-95} bgClass='bg-gray-linear2'>
					<div className='tracking-widest'>
						<div className="mt-12 text-center">
							<p className='text-xl font-medium'>Az Arthur-átok</p>
						</div>
						<p className='font-light text-lg'>szinkronizált, francia horror, 18</p>
						<div className='flex justify-center mt-4 gap-2'>
							<SimpleButton text={'premier'} customClasses="bg-site-25 text-white py-0 px-5" />
							<SimpleButton text={'price'} customClasses="bg-site-26 text-white py-0" />
						</div>
					</div>
					<LinkBtn
						text="Vetítési Idōpontok"
						href={''}
						customClasses="bg-site-27 w-full md:w-auto mt-4 text-white"
					/>
				</TriangleDividerNextItem>
			</div>}
			{filter == 'list' && <div className="Trainers_page page bg-site-2 pb-8">
				<MovieList array={testArray} />
			</div>}

			<div className="bg-site-2 pb-36 md:pt-11">
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0.3, scale: 0.95 }}
					className="container px-4 md:px-0 pb-10"
					key={null}
				>
					<div className='mb-10'>
						<h1
							className="h1-shadow text-center mb-4 h1-shadow--white"
							key={
								null}
						>
							Hamarosan érkezō filmjeink
						</h1>
					</div>
					<div className="flex gap-6 justify-center mb-10 md:mb-14 flex-wrap">
						<CardWithImage bodyContent='Augusztus 11.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='elővétel!' customClass='bg-site-25 text-white uppercase' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
						<CardWithImage bodyContent='Augusztus 20.' imgSrc='/movie.jpeg' />
					</div>
				</motion.div>
			</div>

			{/* <FormWithMap /> */}

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



// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	try {
// 		const {
// 			data: {
// 				data: { frontpage },
// 			},
// 		} = await axios.get<ResType<FrontPageResponseType>>(
// 			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/page_data/frontpage`
// 		);

// 		return {
// 			props: {
// 				banners: frontpage?.banners || [],
// 				classTypes: frontpage?.class_types || [],
// 			},
// 		};
// 	} catch (error) {
// 		console.log(error);

// 		return {
// 			props: {
// 				banners: [],
// 				classTypes: [],
// 			},
// 		};
// 	}
// };

export default Home;
