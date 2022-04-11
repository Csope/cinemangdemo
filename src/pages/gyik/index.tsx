import React from 'react';

const GyikIndex = () => {
	return (
		<div className="page">
			<div className="container">
				<div className="bg-white rounded-3xl px-10 pb-6 pt-10 drop-shadow-md mb-10">
					<h1 className="h1-shadow h1-shadow--purple mb-6">
						Gyakran ismételt kérdések
					</h1>

					<div>
						<div className="mb-1 font-bold">
							Kell-e eszközös csoportos órára bármilyen eszközt magammal vinnem?
						</div>
						<div className="mb-4">
							Termünk többnyire minden órához biztosítja a szükséges eszközt.
							Ezalól kivételt képez a boxkesztyű, amit higiéniai okokból nem
							tudunk biztosítani.
						</div>

						<div className="mb-1 font-bold">
							Kell-e fizetnem bármilyen eszközért?
						</div>
						<div className="mb-4">
							Nem kell eszközhasználati díjat fizetni (sem a TRX-ért, sem a
							Kangoo cipőkért).
						</div>

						<div className="mb-1 font-bold">
							Miért nem tudok online foglalni a honlapon?
						</div>
						<div className="mb-4">
							Csoportos óráink foglalására a terem befogadóképességének 80%-ig
							van lehetőség, a fennmaradó 20% a helyszínen kiváltható.
							Foglalásra csak érvényes bérlettel van lehetőség. Amennyiben nincs
							élő bérleted, úgy meg tudod vásárolni órajegyed honlapunkon. A
							foglalások az órakezdéskor törlődnek. A foglalások lemondására
							legkésőbb 120 perccel az órakezdés előtt van lehetőség a saját
							profilodban. Le nem mondott foglalás esetén egy alkalom levonásra
							kerül bérletedből.
						</div>

						<div className="mb-1 font-bold">
							Mindenképpen kell-e foglalnom ahhoz, hogy részt vegyek egy
							csoportos órán?
						</div>
						<div className="mb-4">
							Nem feltétel az órán való részvételhez a foglalás, de ajánlott a
							biztos bejutás érkedében.
						</div>

						<div className="mb-1 font-bold">
							Mi a teendő, ha lefoglalt órámon mégsem tudok részt venni?
						</div>
						<div className="mb-4">
							A foglaláskor kapott visszaigazoló e-mailből a foglalást
							kitörölni.
						</div>

						<div className="mb-1 font-bold">
							Az aktuális bérletem lejártának utolsó napján még használhatom a
							bérletem?
						</div>
						<div className="mb-4">
							Igen, a bérlet utolsó napján még használható a bérlet.
						</div>

						<div className="mb-1 font-bold">
							Lehet-e a bérletemet szüneteltetni/hosszabbítani?
						</div>
						<div className="mb-4">
							A megvásárolt bérletek szüneteltetésére orvosi igazolás ellenében
							sincs lehetőség. A megvásárolt bérletet hosszabbítani 2990Ft
							megfizetése ellenében, 2 hét időtartamra lehetséges.
						</div>

						<div className="mb-1 font-bold">
							Be tudok-e menni csoportos bérlettel a cardio- és erősítő részre
							edzeni?
						</div>
						<div className="mb-4">Igen, van rá lehetőség.</div>

						<div className="mb-1 font-bold">
							Van-e lehetőség eltérő fizetőeszközökkel (készpénz, bankkártya,
							SZÉP-kártya) fizetni egy tranzakciót?
						</div>
						<div className="mb-4">
							Természetesen van rá lehetőség, kérjük ezt előre jelezd
							recepciónkon.
						</div>

						<div className="mb-1 font-bold">
							Elfelejtettem a szekrényzáram kódját. Mi a teendőm?
						</div>
						<div className="mb-4">
							1000 Ft megfizetése ellenében van mód a szekrény kinyitására.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GyikIndex;
