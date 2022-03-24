import { useQuery } from 'react-query';
import axios from 'axios';
import { ResType } from '../types';
import { ReservabilityType } from '../types';

const checkReservability = async (
	userId: number | undefined,
	sessionId: number | undefined
) => {
	const { data } = await axios.get<ResType<ReservabilityType>>(
		`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders/reservability/by_user/${userId}/to_session/${sessionId}`
	);

	return data;
};

export default function useCheckReservability(
	userId: number | undefined,
	sessionId: number | undefined
) {
	return useQuery(
		['reservations', sessionId],
		() => checkReservability(userId, sessionId),
		{
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			cacheTime: 0,
			enabled: !!sessionId,
		}
	);
}
