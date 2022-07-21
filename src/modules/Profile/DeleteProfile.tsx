import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ConfirmationPopup from '../../common/site/ConfirmationPopup';
import { useToasts, useUser } from '../../hooks';

type PropTypes = {
	mobile?: boolean;
};

const DeleteProfile = ({ mobile = false }: PropTypes) => {
	const { doDeleteProfile } = useUser();
	const [showConfirm, setShowConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const { notify } = useToasts();
	const router = useRouter();

	const deleteProfileClick = () => {
		setShowConfirm(true);
	};

	const deleteProfile = async () => {
		setLoading(true);
		const res = await doDeleteProfile();

		if (res.status) {
			const response = await signOut({ redirect: false });

			if (mobile) {
				router.push('/mobile/timetable');
			} else {
				router.push('/');
			}

			notify('INFO', res.message || 'Fiók törlése sikeres');
		} else {
			notify('ERROR', res.message);
		}

		setShowConfirm(false);
		setLoading(false);
	};

	return (
		<div className="text-center pb-8">
			<button
				onClick={deleteProfileClick}
				className="h1-shadow h1-shadow--purple underline underline-offset-4 text-base"
			>
				Fiók törlése
			</button>

			<ConfirmationPopup
				text="Biztos, hogy törölni szeretnéd a fiókodat?"
				show={showConfirm}
				cancelAction={() => setShowConfirm(false)}
				confirmAction={deleteProfile}
				cancelText="Mégsem"
				confirmText="Törlés"
				title="Megerősítés"
				loading={loading}
			/>
		</div>
	);
};

export default DeleteProfile;
