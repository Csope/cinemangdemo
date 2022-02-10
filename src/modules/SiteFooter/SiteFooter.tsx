import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import BrandLogo from '../../common/site/BrandLogo';

const SiteFooter = () => {
	return (
		<div className="bg-site-1">
			<div className="container flex flex-col md:flex-row px-4 py-10">
				<div className="w-full md:w-3/12 mb-8">
					<div className=" font-bold mb-4 md:mb-6 text-center md:text-left">
						Nyitvatartás
					</div>
					<div>
						<table className="w-full">
							<tbody>
								<tr>
									<td className="pr-4 text-right md:text-left">Hetfo</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-right md:text-left">Kedd</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-right md:text-left">Szerda</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-right md:text-left">Csutortok</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-right md:text-left">Pentek</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-right md:text-left">Szombat</td>
									<td>8:00 - 21:00</td>
								</tr>
								<tr>
									<td className="pr-4 text-right md:text-left">Vasarnap</td>
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
						<div className="text-site-4">info@sugarfitness.hu</div>
					</div>
					<div className=" font-bold mb-4 md:mb-6 text-center md:text-left">
						Megközelítés
					</div>
					<div>
						<table>
							<tbody>
								<tr>
									<td className="pr-4 whitespace-nowrap align-top text-right md:text-left">
										Busz
									</td>
									<td>
										31, 32, 44, 45, 67, 68, 85, 85E, 97E, 100 (Expo busz), 131,
										144, 161, 161A, 168E, 169E, 174, 176E, 231, 244, 261E, 276E,
										277
									</td>
								</tr>
								<tr>
									<td className="pr-4 whitespace-nowrap align-top text-right md:text-left">
										Éjszakai járat
									</td>
									<td>907, 908, 931, 956, 990</td>
								</tr>
								<tr>
									<td className="pr-4 whitespace-nowrap align-top text-right md:text-left">
										Villamos
									</td>
									<td>3, 62, 62A</td>
								</tr>
								<tr>
									<td className="pr-4 whitespace-nowrap align-top text-right md:text-left">
										Metró
									</td>
									<td>M2</td>
								</tr>
								<tr>
									<td className="pr-4 whitespace-nowrap align-top text-right md:text-left">
										Troli
									</td>
									<td>80, 81, 82</td>
								</tr>
								<tr>
									<td className="pr-4 whitespace-nowrap align-top text-right md:text-left">
										Hév
									</td>
									<td>H8, H9</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="w-full md:w-3/12 mb-4 text-center md:text-right text-site-4 font-bold">
					<div className="flex flex-col gap-1 mb-6">
						<a href="#">Sugár Mozi</a>
						<a href="#">Sugár Bowling & Pub</a>
						<a href="#">Sugár Játszóház</a>
					</div>
					<div className="flex flex-col gap-1 mb-6">
						<a href="#">Házirend</a>
						<a href="#">Gyik</a>
						<a href="#">Cardio</a>
					</div>
					<div className="flex text-right gap-3 text-2xl justify-center md:justify-end">
						<div>
							<FiInstagram />
						</div>
						<div>
							<FiFacebook />
						</div>
						<div>
							<FiTwitter />
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<hr className="border-black" />
			</div>
			<div className="container flex flex-col-reverse md:flex-row py-10">
				<div className="w-full md:w-1/3 text-center md:text-left">
					Fotexnet Kft. 2022 © Minden jog fenntartva.
				</div>
				<div className="w-full md:w-1/3 mb-8 md:mb-0">
					<div className="mx-auto" style={{ maxWidth: '200px' }}>
						<BrandLogo />
					</div>
				</div>
				<div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-right font-bold text-site-4">
					<a href="#">Adatvédelmi szabályzat</a>
				</div>
			</div>
		</div>
	);
};

export default SiteFooter;
