import CookieManager from '../CookieManager/CookieManager';
import SiteFooter from '../SiteFooter/SiteFooter';
import HeaderLogo from '../SiteHeader/HeaderLogo';
import MainNavbar from '../SiteHeader/MainNavbar';
import MobileHeaderUser from '../SiteHeader/MobileHeaderUser';
import MobileNavbar from '../SiteHeader/MobileNavbar';
import VideoBg from '../../common/elements/VideoBg';
import FormWithMap from '../SiteFooter/FormWithMap';

type PropType = {
	children: JSX.Element;
};

const WebLayout = ({ children }: PropType) => {
	return (
		<div className="web-layout-wrapper">
					<VideoBg />
			<div className="main-wrapper pattern">
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
				{children}
			</div>
			<SiteFooter />
			<CookieManager />
		</div>

	);
};

export default WebLayout;
