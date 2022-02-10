import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ParallaxProvider } from 'react-scroll-parallax';
import MainNavbar from '../modules/SiteHeader/MainNavbar';
import HeaderLogo from '../modules/SiteHeader/HeaderLogo';
import HeaderUser from '../modules/SiteHeader/HeaderUser';
import SiteFooter from '../modules/SiteFooter/SiteFooter';
import { ClassesProvider } from '../contexts';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'rc-slider/assets/index.css';
import '../styles/globals.scss';
import '../styles/main.scss';

import type { AppProps } from 'next/app';

// React query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ParallaxProvider>
				<QueryClientProvider client={queryClient}>
					<div className="bg-site-1 w-full py-3">
						<div className="container relative">
							<HeaderLogo />
							<MainNavbar />
						</div>
					</div>
					<Component {...pageProps} />
					<SiteFooter />
				</QueryClientProvider>
			</ParallaxProvider>
		</SessionProvider>
	);
}

export default MyApp;
