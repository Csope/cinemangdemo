import { Dialog } from '@headlessui/react';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Btn from '../elements/buttons/Btn';

type PropTypes = {
	show: boolean;
	cancelAction: () => void;
	confirmAction: () => void;
	title: string;
	text: string;
	cancelText: string;
	confirmText: string;
};

const ConfirmationPopup = ({
	show,
	cancelAction,
	confirmAction,
	title,
	text,
	cancelText,
	confirmText,
}: PropTypes) => {
	return (
		<Dialog
			open={show}
			onClose={cancelAction}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					className="relative lg:w-6/12 bg-site-1 bg-glow-purple py-8 px-4 md:px-8 rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-2xl"
						onClick={cancelAction}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-4">
						{title}
					</h1>

					<div className="text-center px-6 text-lg mb-6">{text}</div>

					<div className="grid grid-cols-1 reverse md:grid-cols-2 gap-4 md:gap-10">
						<div>
							<Btn
								text={cancelText}
								clickEvent={cancelAction}
								customClasses="btn-light w-full"
							/>
						</div>
						<div>
							<Btn
								text={confirmText}
								clickEvent={confirmAction}
								customClasses="btn-dark w-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default ConfirmationPopup;
