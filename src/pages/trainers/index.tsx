import type { NextPage } from 'next';
import NormalDarkButton from '../../common/elements/buttons/NormalDarkButton';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';

const Trainers: NextPage = () => {
	return (
		<div className="Trainers_page page bg-site-1">
			<div className="container">
				<div>
					<h1 className="h1-shadow h1-shadow--purple text-center mb-8">
						Oktatók
					</h1>
				</div>
				<FiveColSwiper
					initialSlide={2}
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
				<div className="bg-site-2 mt-10">
					<h1 className="h1-shadow h1-shadow--white">Pakucs Eta</h1>
				</div>
			</TriangleDividerNextItem>
			<div className="bg-site-2 pb-16">
				<div className="container">
					<div className="text-center p-quote p-quote--white">
						"a lustaság fél egészség!"
					</div>
					<div className="text-center font-montserrat italic text-white py-10">
						Aerobic
					</div>
					<div className="flex gap-6 justify-center mb-14">
						<NormalDarkButton
							text="Összes óratípus"
							isLink={true}
							linkHref="/trainers"
						/>
						<NormalDarkButton
							text="Bodyart"
							isLink={true}
							linkHref="/trainers"
						/>
						<NormalDarkButton
							text="Deepwork"
							isLink={true}
							linkHref="/trainers"
						/>
					</div>

					<div className="text-white mb-10">
						<div>Végzettségem:</div>
						<div className="leading-7">
							2018 - Csoportos Fitness Instruktor - IWI 2018 - Capoeira Aerobik
							Instruktor 2018 - FitFight Instruktor
						</div>
					</div>

					<div className="text-white leading-7 mb-10">
						Már kiskoromban számos sportot kibróbáltam, végül a táncban találtam
						meg önmagam. Úgy éreztem, hogy ebből tudok erőt meríteni és ez az,
						ami feltölt. Az akrobatikus rock and roll megalapozta az
						érdeklődésemet a mozgás iránt. Versenyzői múltam után ösztönös
						döntés volt, hogy az életemet a sportnak fogom szentelni. Célom,
						hogy mindenkivel megismertessem azt a bizonyos flow élményt, melynek
						segítségével átélhetsz egy különleges belülről fakadó motivációt,
						amit felhasználhatsz a mindennapokban. Alakformáló óráimon a cardio
						részt ötvözzül a pörgős dinamikus gyakorlatokkal, aminek
						eredményeképpen a teljes testi-lelki energetizálódás mellett a
						bombaforma már csak ráadás. A jó hangulat, és a feltöltődés az óráim
						szerves részét képezik. Ha te is szeretnél egy hosszú nap után
						kikapcsolódni vagy csak szimplán jól indítani a napodat, akkor nem
						kell mást tenned, mint edzőcipőt húznod, és eljönni az órámra. Várok
						mindenkit szeretettel, legyél akár kezdő vagy haladó, fiú vagy lány,
						gyere és éljük át együtt a sport örömét.
					</div>

					<div className="flex gap-10">
						<div className="w-1/2">
							<iframe
								style={{ borderRadius: '14px' }}
								width="100%"
								height="350px"
								src={`https://www.youtube.com/embed/asdasd`}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								title="Embedded youtube"
							/>
						</div>
						<div className="w-1/2">
							<iframe
								style={{ borderRadius: '14px' }}
								width="100%"
								height="350px"
								src={`https://www.youtube.com/embed/asdasd`}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								title="Embedded youtube"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Trainers;
