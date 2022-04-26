//@ts-nocheck
import { Dialog } from '@headlessui/react';
import React, { useEffect, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaRegSmile } from 'react-icons/fa';
import { useActions, useSiteStates } from '../../../hooks';
import { PassType } from '../../../types';
import { HiOutlineEmojiSad } from 'react-icons/hi';

const PassPurchaseResponse = () => {
	const { doEnableScroll, doDisableScroll } = useActions();
	const popupContent = useRef(null);
	const { passPurchaseInProgress, doHidePassPurchaseResponse } =
		useSiteStates();

	const hidePopup = () => {
		doHidePassPurchaseResponse();
	};

	useEffect(() => {
		if (!passPurchaseInProgress) {
			doEnableScroll();
		} else {
			if (popupContent.current) {
				doDisableScroll(popupContent.current);
			}
		}
	}, [passPurchaseInProgress]);

	if (!passPurchaseInProgress) return null;

	const pass: PassType = passPurchaseInProgress.request.page_data?.pass;

	return (
		<Dialog
			open={passPurchaseInProgress ? true : false}
			onClose={() => hidePopup()}
			className="fixed z-10 inset-0 overflow-y-auto"
		>
			<div className="flex text-center items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 opacity-80 bg-white" />

				<div
					ref={popupContent}
					className="relative h-screen overflow-y-auto md:h-auto lg:w-6/12 bg-site-1 bg-glow-purple pt-10 md:pt-8  rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-3xl"
						onClick={() => hidePopup()}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-5">
						Vásárlás
					</h1>
					<div>
						<div className="text-site-4 uppercase text-lg">
							Tranzakció azonosító
						</div>
						<div className="text-2xl">
							{passPurchaseInProgress?.purchase_details?.transaction_number}
						</div>
					</div>
					<div className="rounded-xl px-4 pt-3 pb-3 text-center mt-0 md:mr-8 mb-3 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12 ">
						<div className="mb-3">
							<div className="text-site-4 uppercase text-lg">Bérlet típusa</div>
							<div className="text-2xl font-medium">{pass?.title}</div>
						</div>

						<div className="mb-4">
							<div className="text-lg">{pass?.description}</div>
						</div>

						<div className="mb-2">
							<div className="text-site-4 uppercase text-lg mb-1">
								Érvényesség kezdete
							</div>
							<div className="text-2xl relative">
								{passPurchaseInProgress.request.page_data.startDate}
							</div>
						</div>
					</div>
					{passPurchaseInProgress.status === 'COMPLETED' && (
						<div className="bg-site-22 py-6 mx-4 md:mx-0 text-white flex justify-center items-center flex-col rounded-br-xl rounded-bl-xl rounded-tr-xl md:rounded-tr-none rounded-tl-xl md:rounded-tl-none">
							<div className="text-5xl mb-3">
								<FaRegSmile />
							</div>
							<div className="text-xl">Sikeres vásárlás!</div>
						</div>
					)}

					{passPurchaseInProgress.status === 'FAILED' && (
						<div className=" bg-red-500 py-6 mx-4 md:mx-0 text-white flex justify-center items-center flex-col rounded-br-xl rounded-bl-xl rounded-tr-xl md:rounded-tr-none rounded-tl-xl md:rounded-tl-none">
							<div className="text-5xl mb-3">
								<HiOutlineEmojiSad />
							</div>
							<div className="text-xl">Sikertelen vásárlás!</div>
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default PassPurchaseResponse;
