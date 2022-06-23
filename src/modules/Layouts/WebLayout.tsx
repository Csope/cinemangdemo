import SiteFooter from '../SiteFooter/SiteFooter';
import HeaderLogo from '../SiteHeader/HeaderLogo';
import MainNavbar from '../SiteHeader/MainNavbar';
import MobileHeaderUser from '../SiteHeader/MobileHeaderUser';
import MobileNavbar from '../SiteHeader/MobileNavbar';

type PropType = {
	children: JSX.Element;
};

const WebLayout = ({ children }: PropType) => {
	return (
		<div className="web-layout-wrapper">
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
				{children}
			</div>
			<SiteFooter />
		</div>
	);
};

export default WebLayout;
