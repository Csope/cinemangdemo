import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Btn from '../../../common/elements/buttons/Btn';
import { useUser, useSiteStates } from '../../../hooks';
import PassPurchaseDialog from '../../../modules/Actions/Pass/PassPurchaseDialog';
import PassPurchaseResponse from '../../../modules/Actions/Pass/PassPurchaseResponse';
import { OrderType, PassType, PriceType, ResType } from '../../../types';
import { getHufFormat } from '../../../utils';
import prices from '../../prices';
import { unescape } from 'lodash';
import LoginSection from '../../../common/site/LoginSection';
import ContentLoader from '../../../common/elements/ContentLoader';

type PropTypes = {
	passTypes: any;
	inPurchase: OrderType | false;
	prices: PriceType[];
};

const MobilePrices = ({ passTypes, inPurchase, prices }: PropTypes) => {
	const { status } = useUser();
	const { doShowLogin, showLogin, doHideLogin, passPurchaseInProgress } =
		useSiteStates();
	const { selectedPass, doSetSelectedPass, doShowPassPurchaseResponse } =
		useSiteStates();

	const groupType = passTypes?.non_discounted?.group || [];
	const fitnessType = passTypes?.non_discounted?.fitness || [];

	const passPurchaseClick = (passType: PassType) => {
		if (status === 'loading') return;

		if (status === 'unauthenticated') {
			doShowLogin();
			return;
		}

		doSetSelectedPass(passType);
	};

	useEffect(() => {
		if (inPurchase) {
			doShowPassPurchaseResponse(inPurchase);
		}
	}, []);

	return (
		<div className="Prices page">
			<>
				{passPurchaseInProgress ? (
					<div className="flex items-center justify-center pt-20 pb-28">
						<ContentLoader />
					</div>
				) : (
					<div className="container pb-10">
						<div className="bg-white px-4 pb-6 pt-10 drop-shadow-md mb-8 mx-4 rounded-xl">
							<h1 className="h1-shadow h1-shadow--purple mb-6 text-center">
								Csoportos bérletek
							</h1>

							<p className="mb-2 text-justify">
								Az ár az órákon túl alkalmanként 30 perc kardió és erősítő rész
								használatot is magában foglal. A délelőtt bérlet kizárólag a
								15:00-ig elkezdődő órákon használható.
							</p>

							<div className="divide-y divide-site-6">
								{groupType.map((pass: any) => (
									<div className="price-row py-6" key={pass.id}>
										<div className="title mb-4">{pass.title}</div>
										<div className="price w-full">
											<Btn
												text={getHufFormat(pass.price)}
												appendBefore={
													<FaShoppingCart className="mr-4 text-lg" />
												}
												clickEvent={() => passPurchaseClick(pass)}
												customClasses="btn-dark mb-2 flex w-full ml-auto normal-case min-w-custom-1 justify-center items-center"
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="bg-white px-4 pb-6 pt-10 drop-shadow-md mb-8 mx-4 rounded-xl">
							<h1 className="h1-shadow h1-shadow--purple mb-6 text-center">
								Fitness Bérletek
							</h1>
							<p className="mb-2 text-justify">
								Egy belépéssel 2 óra edzésidő áll rendelkezésre, ennek túllépése
								esetén még egy alkalom levonódik a bérletről. A délelőtti
								bérlettel maximum 14:00-ig lehet a kardió és erősítő részleg
								területére belépni, és azt legkésőbb 16:00-ig el kell hagyni.
							</p>
							<div className="divide-y divide-site-6">
								{fitnessType.map((pass: any) => (
									<div className="price-row py-6" key={pass.id}>
										<div className="title mb-4">{pass.title}</div>
										<div className="price w-full">
											<Btn
												text={getHufFormat(pass.price)}
												appendBefore={
													<FaShoppingCart className="mr-4 text-lg" />
												}
												clickEvent={() => passPurchaseClick(pass)}
												customClasses="btn-dark mb-2 flex w-full ml-auto normal-case min-w-custom-1 justify-center items-center"
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						{prices.map((price, i) => (
							<div
								className="bg-white px-4 pb-6 pt-10 drop-shadow-md mb-8 mx-4 rounded-xl"
								key={i}
							>
								<h1 className="h1-shadow h1-shadow--purple mb-0 text-center">
									{price?.title || 'Egyéb'}
								</h1>

								<div className="divide-y divide-site-6">
									{price?.prices.map((price) => (
										<div className="price-row py-6" key={price.id}>
											<div className="title">
												<div className="flex flex-col items-center justify-center">
													<div
														className="text-center"
														dangerouslySetInnerHTML={{ __html: price.title }}
													></div>
													{price.quantity && (
														<div className="font-normal text-base text-gray-800 whitespace-nowrap">
															{price.quantity}
														</div>
													)}
												</div>
												{price.description && (
													<div
														className="text-sm font-normal mt-2 text-center"
														dangerouslySetInnerHTML={{
															__html: unescape(price.description),
														}}
													></div>
												)}
											</div>
											<div className="price text-lg mt-4 font-bold text-site-4">
												{getHufFormat(parseInt(price.price))}
											</div>
										</div>
									))}
								</div>
							</div>
						))}

						<div className="leading-6 text-justify p-4 ">
							Az 5 alkalmas bérletek 30 napig, a 10, illetve 14 alkalmas
							bérletek 45 napig érvényesek. A bérletek meghosszabbítására
							kiegészítő díj (2 990 Ft) megfizetése ellenében van lehetőség,
							amely 2 hét meghosszabbítást jelent az aktuális bérleten. Az
							aktuális bérlet meghosszabbítására egy alkalommal van lehetőség! A
							cardio és erősítő részleg használatakor &quot;1 alkalom&quot;
							maximum 120 perc ott tartózkodásra jogosít. A csoportos órákra
							váltott jegyekkel, illetve a csoportos bérletekből felhasznált
							alkalmakkal az órákon felül vendégeink még 30 percig használhatják
							fitnessünk cardio és erősítő részlegét. Délelőtti csoportos
							bérlettel a legkésőbb 15:00-kor kezdődő órákon lehet részt venni,
							a délelőtti cardio- és erősítő bérlettel maximum 14:00-ig lehet a
							Fitness területére belépni, és legkésőbb 16:00-ig el kell hagyni
							azt. Délelőtti bérlettel rendelkezők 1 290 Ft kiegészítő díj
							ellenében részt vehetnek délutáni órákon is. A nyugdíjas- és
							diákbérleteinket a lenti jegy- és bérletárakhoz képest 15%-kal
							olcsóbban válthatják meg az arra jogosult látogatóink.
							Pénztárainknál az alábbi kártyákat fogadjuk el: All You Can Move
							kártya, SZÉP Kártya (OTP, K&H, MKB). Zugló kártyával 30%
							kedvezménnyel lehet megváltani cardio- és erősítő jegyeinket és
							bérleteinket. A kártya által biztosított 30%-os kedvezmény más
							kedvezményekkel nem vonható össze! ISIC (International Student
							Identity Card) és ITIC (International Teacher Identity Card)
							nemzetközi igazolvánnyal rendelkező vendégeink saját maguk számára
							mindenkori árainkhoz képest 15% kedvezménnyel válthatják meg
							jegyüket, illetve bérletüket a Sugár Fitnessbe, a kedvezményre
							jogosító okirat bemutatásával.
						</div>
					</div>
				)}
			</>
			{showLogin && (
				<LoginSection
					showLogin={showLogin}
					hideLogin={doHideLogin}
					mobileApp={true}
				/>
			)}

			<PassPurchaseDialog mobileApp={true} />
			<PassPurchaseResponse />
		</div>
	);
};

MobilePrices.layout = 'mobile';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let inPurchase: OrderType | false = false;
	const { hash } = context.query;

	if (hash && hash !== '') {
		try {
			const { data } = await axios.get<ResType<OrderType>>(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders/by_hash/${hash}`
			);

			if (data.status) {
				inPurchase = data.data.order || false;
			} else {
				return {
					redirect: {
						permanent: false,
						destination: '/mobile/404',
					},
				};
			}
		} catch (error) {
			return {
				redirect: {
					permanent: false,
					destination: '/mobile/404',
				},
			};
		}
	}

	//FIXME: use proper res type
	try {
		const {
			data: {
				// @ts-ignore
				data: { pass_types, prices },
			},
			// @ts-ignore
		} = await axios.get<ResType<{ pass_types }>>(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/page_data/tradeables`
		);

		return {
			props: {
				passTypes: pass_types || [],
				prices: prices || [],
				inPurchase,
			},
		};
	} catch (error) {
		return {
			props: {
				passTypes: [],
				prices: [],

				inPurchase,
			},
		};
	}
};

export default MobilePrices;
