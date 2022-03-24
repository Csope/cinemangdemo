import axios from 'axios';
import React from 'react';
import { CreateReservationType } from '../types';
import useUser from './useUser';

const useActions = () => {
	const { user } = useUser();

	const doCreateReservation = async (sessionId: number) => {
		console.log('make reservation');

		if (!user) return false;

		try {
			const reqData: CreateReservationType = {
				return_url: '/',
				customer_id: user?.id,
				cart: [
					{
						type: 'reservation',
						quantity: 1,
						reference_id: sessionId,
					},
				],
			};

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders`,
				reqData
			);

			console.log(res);

			return 'ok';
		} catch (error) {
			console.log(error);
		}
	};

	return { doCreateReservation };
};

export default useActions;
