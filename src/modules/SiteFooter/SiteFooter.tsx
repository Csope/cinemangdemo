import Link from 'next/link';
import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import BrandLogo from '../../common/site/BrandLogo';

const SiteFooter = () => {
	return (
		<div className="site-footer bg-site-15 text-white">
			<div className="container flex flex-col md:flex-row px-4 py-10">
				<div className="w-full md:w-3/12 mb-8">
					<div className=" font-bold mb-4 md:mb-6 text-center md:text-left">
						Nyitvatartás
					</div>
					<div>
						<table className="w-full">
							<tbody>
								<tr>
									<td className="pr-4 text-gray-300 text-right md:text-left">
										Hetfő
									</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 text-right md:text-left">
										Kedd
									</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 text-right md:text-left">
										Szerda
									</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 text-right md:text-left">
										Csütörtök
									</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 text-right md:text-left">
										Péntek
									</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 text-right md:text-left">
										Szombat
									</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 text-right md:text-left">
										Vasárnap
									</td>
									<td>8:00 - 21:00</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="w-full md:w-6/12 mb-8">
					<div className=" font-bold mb-4 md:mb-6 text-center md:text-left">
						Elérhetőség
					</div>
					<div className="mb-8 md:mb-6 text-center md:text-left">
						<div>1148. Budapest, Örs vezér tere 24.</div>
						<div>Sugár Üzletközpont (bejárat az Üzletközpont 2. emeletén)</div>
						<div className="text-site-16">
							<a href="mailto:info@sugarfitness.hu">info@sugarfitness.hu</a>
						</div>
					</div>
					<div className=" font-bold mb-4 md:mb-6 text-center md:text-left">
						Megközelítés
					</div>
					<div>
						<table>
							<tbody>
								<tr>
									<td className="pr-4 text-gray-300 whitespace-nowrap align-top text-right md:text-left">
										Busz
									</td>
									<td>
										31, 32, 44, 45, 67, 68, 85, 85E, 97E, 100 (Expo busz), 131,
										144, 161, 161A, 168E, 169E, 174, 176E, 231, 244, 261E, 276E,
										277
									</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 whitespace-nowrap align-top text-right md:text-left">
										Éjszakai járat
									</td>
									<td>907, 908, 931, 956, 990</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 whitespace-nowrap align-top text-right md:text-left">
										Villamos
									</td>
									<td>3, 62, 62A</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 whitespace-nowrap align-top text-right md:text-left">
										Metró
									</td>
									<td>M2</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 whitespace-nowrap align-top text-right md:text-left">
										Troli
									</td>
									<td>80, 81, 82</td>
								</tr>
								<tr>
									<td className="pr-4 text-gray-300 whitespace-nowrap align-top text-right md:text-left">
										Hév
									</td>
									<td>H8, H9</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="w-full md:w-3/12 mb-4 text-center md:text-right text-site-16 font-bold">
					<div className="flex flex-col gap-1 mb-6">
						<a href="https://sugarmozi.hu/" target={'_blank'}>
							Sugár Mozi
						</a>
						<a href="https://www.sugarbowling.hu/" target={'_blank'}>
							Sugár Bowling & Pub
						</a>
						<a href="https://www.sugarjatszohaz.hu/" target={'_blank'}>
							Sugár Játszóház
						</a>
					</div>
					<div className="flex flex-col gap-1 mb-6">
						<Link href={'/hazirend'}>
							<a>Házirend</a>
						</Link>

						<Link href={'/gyik'}>
							<a>GYIK</a>
						</Link>

						<Link href={'/cardio'}>
							<a>Cardio</a>
						</Link>
					</div>
					<div className="flex text-right gap-3 text-2xl justify-center md:justify-end">
						<div>
							<a
								href="https://www.instagram.com/sugar_fitnessbp/"
								target={'_blank'}
							>
								<FiInstagram />
							</a>
						</div>
						<div>
							<a
								href="https://www.facebook.com/sugarfitness/"
								target={'_blank'}
							>
								<FiFacebook />
							</a>
						</div>
						<div>
							<a href="https://twitter.com/sugarfitnessbp" target={'_blank'}>
								<FiTwitter />
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<hr className="border-white" />
			</div>
			<div className="container flex flex-col-reverse md:flex-row py-10 px-4">
				<div className="w-full text-gray-300 md:w-1/3 text-center md:text-left">
					Fotexnet Kft. {new Date().getFullYear()} © Minden jog fenntartva.
				</div>
				<div className="w-full md:w-1/3 mb-8 md:mb-0">
					<div className="mx-auto" style={{ maxWidth: '200px' }}>
						<BrandLogo fillColor="white" />
					</div>
				</div>
				<div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-right font-bold text-site-16">
					<a
						href="http://fx.fotexnet.hu/docs/adatvedelmitajekoztatoSF.pdf"
						target={'_blank'}
					>
						Adatvédelmi szabályzat
					</a>
				</div>
			</div>
		</div>
	);
};

export default SiteFooter;
