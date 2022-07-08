import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
				<script dangerouslySetInnerHTML={{__html: `
				//<![CDATA[
					var _gaq = _gaq || [];
					_gaq.push(['_setAccount', 'UA-2906607-11']);
					_gaq.push(['_trackPageview']);
			
					(function() {
						var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
						ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
						var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
					})();
				//]]>
				`}}>

				</script>
			</Head>
			<body className="web-layout font-roboto">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
