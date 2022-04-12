import CookieConsent from "react-cookie-consent";

const CookieManager = () => {
	return (
		<CookieConsent
			style={{ background: "#a768b3", alignItems: "center" }}
			buttonStyle={{ color: 'white', background: 'purple', borderRadius: '7px', padding: '7px 40px' }}
			buttonText="Elfogadom"
			expires={20}
			cookieName="cookieName"
		>
			Ez a weboldal a biztonságos böngészés és a felhasználói élmény fokozása érdekében &quot;cookie-kat&quot;(&quot;sütiket&quot;) használ. 
			Az &quot;Elfogadom&quot; gomb megnyomásával hozzájárulsz a sütik alkalmazásához. 
			Részletes Cookie (&quot;süti&quot;) szabályzatunkat <a href='http://fx.fotexnet.hu/docs/cookie.pdf' className='cookie-link' target='_blank' rel="noreferrer">itt találod</a>
		</CookieConsent>
	);
};

export default CookieManager;