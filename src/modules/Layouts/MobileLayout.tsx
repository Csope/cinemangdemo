import MobileAppNavbar from '../MobileApp/MobileAppNavbar';
import { Helmet } from 'react-helmet';

type PropType = {
	children: JSX.Element;
};

const MobileLayout = ({ children }: PropType) => {
	return (
		<div className="mobile-layout-wrapper">
			<Helmet>
				<body className="mobile-layout font-roboto" />
			</Helmet>

			<div className="mobile-layout-content">{children}</div>
			<div className="mobile-layout-footer z-40">
				<MobileAppNavbar />
			</div>
		</div>
	);
};

export default MobileLayout;
