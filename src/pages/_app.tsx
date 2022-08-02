import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ParallaxProvider } from 'react-scroll-parallax';
import {
	ClassFilterProvider,
	SelectedSessionProvider,
	FavoritesProvider,
	SiteStatesProvider,
	UserProvider,
} from '../contexts';
import Head from 'next/head';
import OAuthHandler from '../modules/Actions/OAuthHandler/OAuthHandler';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import InitPageLoad from '../modules/InitPageLoad';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { hu } from 'date-fns/locale';
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
import '../styles/mobile-app.scss';
import 'react-phone-number-input/style.css';

//layouts
import MobileLayout from '../modules/Layouts/MobileLayout';
import WebLayout from '../modules/Layouts/WebLayout';
const layouts = {
	mobile: MobileLayout,
	web: WebLayout,
};

import type { AppProps } from 'next/app';

// React query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	// @ts-ignore
	const Layout = Component?.layout ? layouts[Component.layout] : layouts['web'];

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
												<Layout>
													<Component {...pageProps} />
												</Layout>
												
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
