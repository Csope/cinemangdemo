import axios from 'axios';
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
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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

	const doResignReservationWithHash = async (hash: string) => {
		const returnData = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const { data } = await axios.delete(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders/reservation/by_hash/${hash}`
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

	const doPurchaseTicket = async (
		session: SessionType,
		mobileApp: boolean = false
	) => {
		const returnData: OrderReturnType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const returnUrl = mobileApp
				? `sugarfitness:/${router.pathname}?hash=`
				: `${process.env.NEXT_PUBLIC_BASE_URL}/timetable?hash=`;

			const reqData: PurchaseReservationType = {
				return_url: returnUrl,

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

	const doPurchasePass = async (
		pass: PassType,
		startDate: string,
		mobileApp: boolean = false
	) => {
		const returnData: OrderReturnType = {
			status: false,
			message: 'Belső kiszolgálóhiba, próbáld újra később',
			errors: [],
		};

		try {
			const returnUrl = mobileApp
				? `sugarfitness:/${router.pathname}?hashpass=`
				: `${process.env.NEXT_PUBLIC_BASE_URL}/prices?hash=`;

			const reqData: PurchasePassType = {
				return_url: returnUrl,

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

	const doSendContactMessage = async (
		name: string,
		email: string,
		message: string
	) => {
		try {
			const { data } = await axios.post<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/contacts`,
				{
					name,
					email,
					message,
				}
			);

			return {
				status: data.status,
				message: data.message || '',
			};
		} catch (error) {
			return {
				status: false,
				message: 'Belső kiszolgálóhiba, próbáld újra később',
			};
		}
	};

	const doDisableScroll = (refElement: any) => {
		return;
		// disableBodyScroll(refElement, {
		// 	reserveScrollBarGap: true,
		// });
		// document.documentElement.style.overflow = 'hidden';
	};

	const doEnableScroll = () => {
		return;
		// clearAllBodyScrollLocks();
		// document.documentElement.style.overflow = 'auto';
	};

	return {
		doCreateReservation,
		doPurchaseTicket,
		doResignReservation,
		doPurchasePass,
		doSendContactMessage,
		doDisableScroll,
		doEnableScroll,
		doResignReservationWithHash,
	};
};

export default useActions;
