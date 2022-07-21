import { useState } from 'react';
import ConfirmationPopup from '../../../common/site/ConfirmationPopup';
import LoginSection from '../../../common/site/LoginSection';
import { useUser } from '../../../hooks';
import DeleteProfile from '../../../modules/Profile/DeleteProfile';
import ProfileContent from '../../../modules/Profile/ProfileContent';

const MobileProfile = () => {
	const [showConfirm, setShowConfirm] = useState(false);
	const { status, doSignOut, user } = useUser();
	const doLogout = () => {
		doSignOut();
	};

	const logoutConfirm = () => {
		setShowConfirm(false);
		doLogout();
	};

	if (status === 'authenticated' && user) {
		return (
			<div className="py-8">
				<div>
					<ProfileContent />
				</div>
				<div className="text-center pb-10">
					<button
						onClick={() => setShowConfirm(true)}
						className="h1-shadow h1-shadow--purple underline underline-offset-4"
					>
						Kijelentkezés
					</button>
				</div>

				<ConfirmationPopup
					text="Biztos, hogy ki szeretnél jelentkezni?"
					show={showConfirm}
					cancelAction={() => setShowConfirm(false)}
					confirmAction={logoutConfirm}
					cancelText="Mégsem"
					confirmText="Kijelentkezés"
					title="Megerősítés"
					loading={false}
				/>

				<DeleteProfile mobile={true} />
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
