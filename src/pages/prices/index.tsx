import React, { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ResType, PassType, OrderType, PriceType } from '../../types';
import Btn from '../../common/elements/buttons/Btn';
import PassPurchaseDialog from '../../modules/Actions/Pass/PassPurchaseDialog';
import { useSiteStates, useUser } from '../../hooks';
import { getHufFormat } from '../../utils';
import PassPurchaseResponse from '../../modules/Actions/Pass/PassPurchaseResponse';
import { unescape } from 'lodash';

type PropTypes = {
	passTypes: any;
	inPurchase: OrderType | false;
	prices: PriceType[];
};

const Prices = ({ passTypes, inPurchase, prices }: PropTypes) => {
	const { status } = useUser();
	const { doShowLogin } = useSiteStates();
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
			<div className="container pb-10">
				<div className="bg-white md:rounded-3xl px-4 md:px-10 pb-6 pt-10 drop-shadow-md mb-8 md:mb-10 mx-4 md:mx-0 rounded-xl">
					<h1 className="h1-shadow h1-shadow--purple mb-6 text-center md:text-left">
						Csoportos bérletek
					</h1>

					<p className="mb-2 text-justify md:text-left">
						Az ár az órákon túl alkalmanként 30 perc kardió és erősítő rész
						használatot is magában foglal. A délelőtt bérlet kizárólag a
						15:00-ig elkezdődő órákon használható.
					</p>

					<div className="divide-y divide-site-6">
						{groupType.map((pass: any) => (
							<div className="price-row py-6" key={pass.id}>
								<div className="title mb-4 md:mb-0">{pass.title}</div>
								<div className="price w-full md:w-auto">
									<Btn
										text={getHufFormat(pass.price)}
										appendBefore={<FaShoppingCart className="mr-4 text-lg" />}
										clickEvent={() => passPurchaseClick(pass)}
										customClasses="btn-dark mb-2 md:mb-0 flex w-full md:w-auto ml-auto normal-case min-w-custom-1 justify-center items-center"
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white md:rounded-3xl px-4 md:px-10 pb-6 pt-10 drop-shadow-md mb-8 md:mb-10 mx-4 md:mx-0 rounded-xl">
					<h1 className="h1-shadow h1-shadow--purple mb-6 text-center md:text-left">
						Fitness Bérletek
					</h1>
					<p className="mb-2 text-justify md:text-left">
						Egy belépéssel 2 óra edzésidő áll rendelkezésre, ennek túllépése
						esetén még egy alkalom levonódik a bérletről. A délelőtti bérlettel
						maximum 14:00-ig lehet a kardió és erősítő részleg területére
						belépni, és azt legkésőbb 16:00-ig el kell hagyni.
					</p>
					<div className="divide-y divide-site-6">
						{fitnessType.map((pass: any) => (
							<div className="price-row py-6" key={pass.id}>
								<div className="title mb-4 md:mb-0">{pass.title}</div>
								<div className="price w-full md:w-auto">
									<Btn
										text={getHufFormat(pass.price)}
										appendBefore={<FaShoppingCart className="mr-4 text-lg" />}
										clickEvent={() => passPurchaseClick(pass)}
										customClasses="btn-dark mb-2 md:mb-0 flex w-full md:w-auto ml-auto normal-case min-w-custom-1 justify-center items-center"
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				{prices.map((price, i) => (
					<div
						className="bg-white md:rounded-3xl px-4 md:px-10 pb-6 pt-10 drop-shadow-md mb-8 md:mb-10 mx-4 md:mx-0 rounded-xl"
						key={i}
					>
						<h1 className="h1-shadow h1-shadow--purple mb-0 md:mb-6 text-center md:text-left">
							{price?.title || 'Egyéb'}
						</h1>
						<div className="divide-y divide-site-6">
							{price?.prices.map((price) => (
								<div className="price-row py-6" key={price.id}>
									<div className="title">
										<div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
											<div
												className="text-center md:text-left"
												dangerouslySetInnerHTML={{ __html: price.title }}
											></div>
											{price.quantity && (
												<div className="font-normal md:ml-4 text-base md:text-lg text-gray-800 whitespace-nowrap">
													{price.quantity}
												</div>
											)}
										</div>
										{price.description && (
											<div
												className="text-sm md:text-base font-normal mt-2 text-center md:text-left"
												dangerouslySetInnerHTML={{
													__html: unescape(price.description),
												}}
											></div>
										)}
									</div>
									<div className="price text-lg md:text-xl mt-4 md:mt-0 font-bold text-site-4">
										{getHufFormat(parseInt(price.price))}
									</div>
								</div>
							))}
						</div>
					</div>
				))}

				<div className="leading-8 text-justify p-4 md:p-0">
					Az 5 alkalmas bérletek 30 napig, a 10, illetve 14 alkalmas bérletek 45
					napig érvényesek. A bérletek meghosszabbítására kiegészítő díj (2 990
					Ft) megfizetése ellenében van lehetőség, amely 2 hét meghosszabbítást
					jelent az aktuális bérleten. Az aktuális bérlet meghosszabbítására egy
					alkalommal van lehetőség! A cardio és erősítő részleg használatakor
					&quot;1 alkalom&quot; maximum 120 perc ott tartózkodásra jogosít. A
					csoportos órákra váltott jegyekkel, illetve a csoportos bérletekből
					felhasznált alkalmakkal az órákon felül vendégeink még 30 percig
					használhatják fitnessünk cardio és erősítő részlegét. Délelőtti
					csoportos bérlettel a legkésőbb 15:00-kor kezdődő órákon lehet részt
					venni, a délelőtti cardio- és erősítő bérlettel maximum 14:00-ig lehet
					a Fitness területére belépni, és legkésőbb 16:00-ig el kell hagyni
					azt. Délelőtti bérlettel rendelkezők 1 290 Ft kiegészítő díj ellenében
					részt vehetnek délutáni órákon is. A nyugdíjas- és diákbérleteinket a
					lenti jegy- és bérletárakhoz képest 15%-kal olcsóbban válthatják meg
					az arra jogosult látogatóink. Pénztárainknál az alábbi kártyákat
					fogadjuk el: All You Can Move kártya, SZÉP Kártya (OTP, K&H, MKB).
					Zugló kártyával 30% kedvezménnyel lehet megváltani cardio- és erősítő
					jegyeinket és bérleteinket. A kártya által biztosított 30%-os
					kedvezmény más kedvezményekkel nem vonható össze! ISIC (International
					Student Identity Card) és ITIC (International Teacher Identity Card)
					nemzetközi igazolvánnyal rendelkező vendégeink saját maguk számára
					mindenkori árainkhoz képest 15% kedvezménnyel válthatják meg jegyüket,
					illetve bérletüket a Sugár Fitnessbe, a kedvezményre jogosító okirat
					bemutatásával.
				</div>
			</div>

			<PassPurchaseDialog />
			<PassPurchaseResponse />
		</div>
	);
};

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
						destination: '/404',
					},
				};
			}
		} catch (error) {
			return {
				redirect: {
					permanent: false,
					destination: '/404',
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

export default Prices;
