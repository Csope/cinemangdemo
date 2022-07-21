import { Dialog } from '@headlessui/react';
import React, { useEffect, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useActions } from '../../hooks';
import Btn from '../elements/buttons/Btn';
import ContentLoader from '../elements/ContentLoader';

type PropTypes = {
	show: boolean;
	cancelAction: () => void;
	confirmAction: () => void;
	title: string;
	text: string;
	cancelText: string;
	confirmText: string;
	loading?: boolean;
};

const ConfirmationPopup = ({
	show,
	cancelAction,
	confirmAction,
	title,
	text,
	cancelText,
	confirmText,
	loading,
}: PropTypes) => {
	const popupContent = useRef(null);
	const { doDisableScroll, doEnableScroll } = useActions();

	useEffect(() => {
		if (show) {
			if (popupContent.current) {
				doDisableScroll(popupContent.current);
			}
		} else {
			doEnableScroll();
		}
	}, [show]);

	return (
		<Dialog
			open={show}
			onClose={cancelAction}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="hidden md:block fixed inset-0 opacity-80 bg-white" />

				<div
					ref={popupContent}
					className="fixed inset-0 flex items-center justify-center flex-col md:block md:relative lg:w-6/12 bg-site-1 bg-glow-purple py-8 px-4 md:px-8 md:rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-3xl"
						onClick={cancelAction}
					>
						<AiFillCloseCircle />
					</div>

					<div>
						<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-4">
							{title}
						</h1>

						<div className="text-center px-6 text-lg mb-6">{text}</div>

						<div className="grid grid-cols-1 reverse md:grid-cols-2 gap-6 md:gap-10 w-full">
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

					{loading && (
						<div className="absolute inset-0 flex justify-center items-center bg-site-1 rounded-xl bg-opacity-70">
							<ContentLoader />
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default ConfirmationPopup;
