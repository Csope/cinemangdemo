import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ParallaxProvider } from 'react-scroll-parallax';
import MainNavbar from '../modules/SiteHeader/MainNavbar';
import HeaderLogo from '../modules/SiteHeader/HeaderLogo';
import SiteFooter from '../modules/SiteFooter/SiteFooter';
import CookieManager from '../modules/CookieManager/CookieManager';
import {
	ClassFilterProvider,
	SelectedSessionProvider,
	FavoritesProvider,
	SiteStatesProvider,
	UserProvider,
} from '../contexts';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import InitPageLoad from '../modules/InitPageLoad';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { hu } from 'date-fns/locale';
import CookieConsent from 'react-cookie-consent';
registerLocale('hu', hu);
setDefaultLocale('hu');

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.scss';
import '../styles/main.scss';

import type { AppProps } from 'next/app';
import MobileNavbar from '../modules/SiteHeader/MobileNavbar';
import MobileHeaderUser from '../modules/SiteHeader/MobileHeaderUser';
import Head from 'next/head';
import OAuthHandler from '../modules/Actions/OAuthHandler/OAuthHandler';

// React query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<UserProvider>
				<FavoritesProvider>
					<SiteStatesProvider>
						<ClassFilterProvider>
							<SelectedSessionProvider>
								<ParallaxProvider>
									<QueryClientProvider client={queryClient}>
										<InitPageLoad>
											<>
												<Head>
													<meta
														name="viewport"
														content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
													/>
												</Head>
												<div className="main-wrapper bg-site-17">
													<div className="w-full py-3">
														<div className="container relative">
															<div className="flex px-4 md:px-0 items-center">
																<MobileNavbar />
																<HeaderLogo />
																<MobileHeaderUser />
															</div>
															<MainNavbar />
														</div>
													</div>
													<Component {...pageProps} />
												</div>
												<SiteFooter />
												<CookieManager />
												<OAuthHandler />
												<NextNProgress
													color="#680b65"
													options={{ showSpinner: false }}
												/>
											</>
										</InitPageLoad>
										<ToastContainer />
									</QueryClientProvider>
								</ParallaxProvider>
							</SelectedSessionProvider>
						</ClassFilterProvider>
					</SiteStatesProvider>
				</FavoritesProvider>
			</UserProvider>
		</SessionProvider>
	);
}

export default MyApp;
