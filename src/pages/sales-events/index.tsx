import { GetServerSideProps } from 'next';
import React from 'react';
import CardWithImage from '../../common/elements/cards/CardWithImage';
import Masonry from 'react-masonry-css';
import TestImg1 from '../../../public/images/cks_kezdoBerlet.jpg';
import TestImg2 from '../../../public/images/cks_ujraNyitva2.jpg';
import TestImg3 from '../../../public/images/cks_villam12.jpg';

const SalesAndEvents = () => {
	return (
		<div className="SalesAndEvents page">
			<div className="container pb-6 md:pb-10">
				<h1 className="text-center h1-shadow h1-shadow--purple mb-8 md:mb-12 hidden md:block">
					Akciók / események
				</h1>

				<div className="mx-4 md:mx-0">
					<Masonry
						breakpointCols={{
							default: 2,
							768: 1,
						}}
						className="SalesAndEvents__masonry-grid"
						columnClassName="SalesAndEvents__masonry-grid_column"
					>
						<CardWithImage
							imgSrc={TestImg1.src}
							bodyContent={
								<div>
									<h1>Vásárold meg bérleted ONLINE!</h1>
									<div className="content text-justify md:text-left">
										Örömmel értesítünk, hogy 2021. szeptember 6-tól elindítjuk
										az online bérletvásárlás lehetőségét a Sugár Fitness
										honlapján!🤩 Ezentúl minden az Áraink menüpont alatt
										található teljes árú bérletet megvásárolhatsz weboldalunkon,
										legyen az csoportos órákra, vagy cardio- és erősítő
										részlegünkre szóló. Ami még jobb hír, hogy ezentúl a
										bérletakciók keretén belül is beszerezheted legújabb
										bérleted online, sorban állás nélkül, mindezt úgy, hogy a
										nyitvatartásunkat sem kell figyelned, hiszen a bérletakció
										napján akár éjfélig is megvásárolhatod azt!
									</div>
								</div>
							}
						/>
						<CardWithImage
							imgSrc={TestImg2.src}
							bodyContent={
								<div>
									<h1>Fontos tájékoztató foglalási rendszerünkről</h1>
									<div className="content">
										A továbbiakban mindenki számára elérhető lesz honlapunkon
										egy profil, amelynek segítségével nem csak a foglalásaidat
										intézheted kérni. Ahhoz, hogy minél előbb lefoglalhasd
										helyed kedvenc óráidra, és létrehozhassuk a szükséges
										profilt részedre, kérjük, első belépésedkor személyesen, a
										Sugár Fitness recepcióján egyeztesd adataidat kollégáinkkal,
										illetve a profilodhoz tartozó jelszót is személyesen adjuk
										oda Neked. <br />
										<br /> Már All You Can Move kártyával rendelkező vendégeink
										számára is eléa is! Amennyiben már rendelkezel profillal,
										úgy a foglaláshoz hasonlóan a vásárlást is megejtheted
										bejelentkezve. <br />
										<br /> Ha még nincs profilod, akkor sem kell izgulnod,
										ugyanis vásárolni így is tudsz.
									</div>
								</div>
							}
						/>
						<CardWithImage
							imgSrc={TestImg3.src}
							bodyContent={
								<div>
									<h1>Vásárolj recepciónkon SZÉP-kártyáddal!</h1>
									<div className="content">
										A kormány rendelete szerint 2022. December 31-ig OTP, MKB és
										K&H SZÉP-kártyád bármelyik alszámlájáról vásárolhatsz a
										Sugár Fitness recepcióján!
									</div>
								</div>
							}
						/>
					</Masonry>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		// const {
		// 	data: {
		// 		status,
		// 		data: { sessions },
		// 	},
		// } = await axios.post<ResType<SessionType[]>>(
		// 	`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/sessions/filtered`,
		// 	{
		// 		by_date: {
		// 			from: fromDate,
		// 			to: toDate,
		// 		},
		// 	}
		// );

		return {
			props: {
				data: [],
			},
		};
	} catch (error) {
		return {
			props: {
				data: [],
			},
		};
	}
};

export default SalesAndEvents;
