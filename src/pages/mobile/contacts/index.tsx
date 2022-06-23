const MobileContacts = () => {
	return (
		<div className="page">
			<div className="container">
				<div className="bg-white px-4 pb-6 pt-10 drop-shadow-md mb-8 mx-4 rounded-xl">
					<h1 className="h1-shadow h1-shadow--purple mb-6 text-center">
						Nyitvatartás
					</h1>

					<div>
						<div className="flex gap-3 justify-center mb-3">
							<div>Hetfő</div>
							<div className="font-bold">8:00 - 21:00</div>
						</div>
						<div className="flex gap-3 justify-center mb-3">
							<div>Kedd</div>
							<div className="font-bold">8:00 - 21:00</div>
						</div>
						<div className="flex gap-3 justify-center mb-3">
							<div>Szerda</div>
							<div className="font-bold">8:00 - 21:00</div>
						</div>
						<div className="flex gap-3 justify-center mb-3">
							<div>Csütörtök</div>
							<div className="font-bold">8:00 - 21:00</div>
						</div>
						<div className="flex gap-3 justify-center mb-3">
							<div>Péntek</div>
							<div className="font-bold">8:00 - 21:00</div>
						</div>
						<div className="flex gap-3 justify-center mb-3">
							<div>Szombat</div>
							<div className="font-bold">8:00 - 21:00</div>
						</div>
						<div className="flex gap-3 justify-center mb-3">
							<div>Vasárnap</div>
							<div className="font-bold">8:00 - 21:00</div>
						</div>
					</div>
				</div>

				<div className="bg-white px-4 pb-6 pt-10 drop-shadow-md mb-8 mx-4 rounded-xl">
					<h1 className="h1-shadow h1-shadow--purple mb-6 text-center">
						Elérhetőség
					</h1>

					<div className="text-center mb-3">
						<div>1148 Budapest, Örs vezér tere 24.</div>
						<div>Sugár Üzletközpont (bejárat az Üzletközpont 2. emeletén)</div>
						<div className="text-site-3 mt-3">
							<a href="mailto:info@sugarfitness.hu">info@sugarfitness.hu</a>
						</div>
					</div>
				</div>

				<div className="bg-white px-4 pb-6 pt-10 drop-shadow-md mb-8 mx-4 rounded-xl">
					<h1 className="h1-shadow h1-shadow--purple mb-6 text-center">
						Megközelítés
					</h1>

					<div className="text-center">
						<div className="mb-3">
							<div className="mb-1 font-bold">Busz</div>
							<div>
								31, 32, 44, 45, 67, 68, 85, 85E, 97E, 100 (Expo busz), 131, 144,
								161, 161A, 168E, 169E, 174, 176E, 231, 244, 261E, 276E, 277
							</div>
						</div>
						<div className="mb-3">
							<div className="mb-1 font-bold">Éjszakai járat</div>
							<div>907, 908, 931, 956, 990</div>
						</div>
						<div className="mb-3">
							<div className="mb-1 font-bold">Villamos</div>
							<div>3, 62, 62A</div>
						</div>
						<div className="mb-3">
							<div className="mb-1 font-bold">Metró</div>
							<div>M2</div>
						</div>
						<div className="mb-3">
							<div className="mb-1 font-bold">Troli</div>
							<div>80, 81, 82</div>
						</div>
						<div className="mb-3">
							<div className="mb-1 font-bold">Hév</div>
							<div>H8, H9</div>
						</div>
					</div>
				</div>

				<div className=" mb-14 text-center">
					<a
						className="h1-shadow h1-shadow--purple underline underline-offset-4"
						href="http://fx.fotexnet.hu/docs/adatvedelmitajekoztatoSF.pdf"
						target={'_blank'}
						rel="noreferrer"
					>
						Adatvédelmi szabályzat
					</a>
				</div>
			</div>
		</div>
	);
};

MobileContacts.layout = 'mobile';

export default MobileContacts;
