import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ParallaxProvider } from 'react-scroll-parallax';
import MainNavbar from '../modules/SiteHeader/MainNavbar';
import HeaderLogo from '../modules/SiteHeader/HeaderLogo';
import SiteFooter from '../modules/SiteFooter/SiteFooter';
import {
	ClassFilterProvider,
	SelectedSessionProvider,
	FavoritesProvider,
	SiteStatesProvider,
} from '../contexts';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'rc-slider/assets/index.css';
import '../styles/globals.scss';
import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import InitPageLoad from '../modules/InitPageLoad';

// React query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<FavoritesProvider>
				<SiteStatesProvider>
					<ClassFilterProvider>
						<SelectedSessionProvider>
							<ParallaxProvider>
								<QueryClientProvider client={queryClient}>
									<InitPageLoad>
										<>
											<div className="main-wrapper bg-site-17">
												<div className="w-full py-3">
													<div className="container relative">
														<HeaderLogo />
														<MainNavbar />
													</div>
												</div>
												<Component {...pageProps} />
											</div>

											<SiteFooter />
											<NextNProgress color="#680b65" />
										</>
									</InitPageLoad>
									<ToastContainer />
								</QueryClientProvider>
							</ParallaxProvider>
						</SelectedSessionProvider>
					</ClassFilterProvider>
				</SiteStatesProvider>
			</FavoritesProvider>
		</SessionProvider>
	);
}

export default MyApp;
