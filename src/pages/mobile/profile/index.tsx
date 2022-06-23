import LoginSection from '../../../common/site/LoginSection';
import { useUser } from '../../../hooks';
import ProfileContent from '../../../modules/Profile/ProfileContent';

const MobileProfile = () => {
	const { status, doSignOut, user } = useUser();
	const doLogout = () => {
		doSignOut();
	};

	if (status === 'authenticated' && user) {
		return (
			<div className="py-8">
				<div>
					<ProfileContent />
				</div>
				<div className="text-center pb-5">
					<button
						onClick={doLogout}
						className="h1-shadow h1-shadow--purple underline underline-offset-4"
					>
						Kijelentkezés
					</button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<LoginSection
				showLogin={true}
				hideLogin={() => false}
				mobileApp={true}
				closable={false}
			/>
		</div>
	);
};

MobileProfile.layout = 'mobile';

export default MobileProfile;
