import { Dialog } from '@headlessui/react';
import React, { MouseEvent, useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaRegSmile, FaShoppingCart } from 'react-icons/fa';
import Btn from '../../../common/elements/buttons/Btn';
import ContentLoader from '../../../common/elements/ContentLoader';
import { useActions, useSiteStates } from '../../../hooks';
import SimpleLogo from '../../../../public/images/simple.png';
import { getHufFormat } from '../../../utils';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { PassType } from '../../../types';
import { HiOutlineEmojiSad } from 'react-icons/hi';

const PassPurchaseResponse = () => {
	const { passPurchaseInProgress, doHidePassPurchaseResponse } =
		useSiteStates();
	// const { passPurchaseInProgress } = useActions();

	const hidePopup = () => {
		doHidePassPurchaseResponse();
	};

	if (!passPurchaseInProgress) return null;

	// @ts-ignore
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
					className="relative lg:w-6/12 bg-site-1 bg-glow-purple pt-8  rounded-xl"
					style={{ maxWidth: 500 }}
				>
					<div
						className="absolute cursor-pointer right-5 top-4 text-site-4 text-3xl"
						onClick={() => hidePopup()}
					>
						<AiFillCloseCircle />
					</div>

					<h1 className="text-center h1-shadow h1-shadow--purple text-3xl mb-3">
						Vásárlás
					</h1>
					<div>
						<div className="text-site-4 uppercase text-lg">
							Tranzakció azonosító
						</div>
						<div className="text-2xl">
							{passPurchaseInProgress.payload.completed_purchase.transaction_id}
						</div>
					</div>
					<div className="rounded-xl px-4 pt-3 pb-3 text-center mt-4 md:mr-8 mb-8 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12 ">
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
								{
									// @ts-ignore
									passPurchaseInProgress.request.page_data.startDate
								}
							</div>
						</div>
					</div>
					{passPurchaseInProgress.status === 'COMPLETED' && (
						<div className="bg-site-22 py-6 text-white flex justify-center items-center flex-col rounded-br-xl rounded-bl-xl">
							<div className="text-5xl mb-3">
								<FaRegSmile />
							</div>
							<div className="text-xl">Sikeres vásárlás!</div>
						</div>
					)}

					{passPurchaseInProgress.status === 'FAILED' && (
						<div className=" bg-red-500 py-6 text-white flex justify-center items-center flex-col rounded-br-xl rounded-bl-xl">
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
