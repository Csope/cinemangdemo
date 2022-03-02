import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ParallaxProvider } from 'react-scroll-parallax';
import MainNavbar from '../modules/SiteHeader/MainNavbar';
import HeaderLogo from '../modules/SiteHeader/HeaderLogo';
import SiteFooter from '../modules/SiteFooter/SiteFooter';
import { ClassFilterProvider } from '../contexts';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'rc-slider/assets/index.css';
import '../styles/globals.scss';
import '../styles/main.scss';

import type { AppProps } from 'next/app';
import InitPageLoad from '../modules/InitPageLoad';

// React query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ClassFilterProvider>
				<ParallaxProvider>
					<QueryClientProvider client={queryClient}>
						<InitPageLoad>
							<>
								<div className="main-wrapper bg-site-1">
									<div className="w-full py-3">
										<div className="container relative">
											<HeaderLogo />
											<MainNavbar />
										</div>
									</div>
									<Component {...pageProps} />
								</div>

								<SiteFooter />
							</>
						</InitPageLoad>
					</QueryClientProvider>
				</ParallaxProvider>
			</ClassFilterProvider>
		</SessionProvider>
	);
}

export default MyApp;
