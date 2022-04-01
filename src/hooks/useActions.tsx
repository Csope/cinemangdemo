import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import {
	CreateReservationType,
	PassType,
	PurchasePassType,
	PurchaseReservationResponse,
	PurchaseReservationType,
	ReservationType,
	ResType,
	SessionType,
} from '../types';
import useUser from './useUser';

interface OrderReturnType {
	status: boolean;
	message: string;
	paymentUrl?: string;
	errors:
		| {
				field: string;
				message: string;
		  }[]
		| [];
}

const useActions = () => {
	const router = useRouter();
	const { user } = useUser();

	const doResignReservation = async (reservationId: number) => {
		const returnData = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const { data } = await axios.delete(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders/reservation/${reservationId}`
			);

			returnData.status = data.status;
			returnData.message = data.message;
			returnData.errors = data.errors;

			return returnData;
		} catch (error) {
			return returnData;
		}
	};

	const doCreateReservation = async (sessionId: number) => {
		const returnData: OrderReturnType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const reqData: CreateReservationType = {
				return_url: '/',
				// @ts-ignore
				customer_id: user?.id,
				cart: [
					{
						type: 'reservation',
						quantity: 1,
						reference_id: sessionId,
					},
				],
			};

			const { data } = await axios.post<ResType<ReservationType>>(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders`,
				reqData
			);

			returnData.status = data.status;
			returnData.message = data.message || '';
			// @ts-ignore
			returnData.errors = data.errors || [];

			return returnData;
		} catch (error) {
			return returnData;
		}
	};

	const doPurchaseTicket = async (session: SessionType) => {
		const returnData: OrderReturnType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const reqData: PurchaseReservationType = {
				return_url: process.env.NEXT_PUBLIC_BASE_URL + router.pathname,

				// @ts-ignore
				customer_id: user?.id,
				cart: [
					{
						type: 'paid_reservation',
						quantity: 1,
						reference_id: session.id,
					},
				],
				page_data: {
					session,
				},
			};

			const { data } = await axios.post<PurchaseReservationResponse>(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders`,
				reqData
			);

			if (data.status) {
				returnData.status = data.status;
				// @ts-ignore
				returnData.paymentUrl = data.data.payment_url;
				returnData.message = data.message || '';
				// @ts-ignore
				returnData.errors = data.errors || [];
			} else {
				returnData.message = data.message || '';
				// @ts-ignore
				returnData.errors = data.errors || [];
			}

			return returnData;
		} catch (error) {
			console.log(error);

			return returnData;
		}
	};

	const doPurchasePass = async (pass: PassType, startDate: string) => {
		const returnData: OrderReturnType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const reqData: PurchasePassType = {
				return_url: process.env.NEXT_PUBLIC_BASE_URL + router.pathname,

				// @ts-ignore
				customer_id: user?.id,
				cart: [
					{
						type: 'pass',
						quantity: 1,
						reference_id: pass.id,
						misc: {
							start: startDate,
						},
					},
				],
				page_data: {
					pass,
					startDate,
				},
			};

			const { data } = await axios.post<PurchaseReservationResponse>(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders`,
				reqData
			);

			if (data.status) {
				returnData.status = data.status;
				// @ts-ignore
				returnData.paymentUrl = data.data.payment_url;
				returnData.message = data.message || '';
				// @ts-ignore
				returnData.errors = data.errors || [];
			} else {
				returnData.message = data.message || '';
				// @ts-ignore
				returnData.errors = data.errors || [];
			}

			return returnData;
		} catch (error) {
			console.log(error);

			return returnData;
		}
	};

	return {
		doCreateReservation,
		doPurchaseTicket,
		doResignReservation,
		doPurchasePass,
	};
};

export default useActions;
