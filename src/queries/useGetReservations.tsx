import { useQuery } from 'react-query';
import axios from 'axios';
import { ResType, ReservationType } from '../types';
import { useUser } from '../hooks';

const getReservations = async (userId?: number) => {
	if (!userId) return;

	const { data } = await axios.get<ResType<ReservationType[]>>(
		`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/${userId}/reservations`
	);

	return data;
};

export default function useGetReservations() {
	const { user } = useUser();

	const { data, isFetching, refetch } = useQuery(
		['reservations', user?.id],
		() => getReservations(user?.id),
		{
			retry: false,
		}
	);

	const reservations: ReservationType[] = data?.data?.reservations || [];

	return {
		reservations,
		isFetchingReservations: isFetching,
		refetchReservations: refetch,
	};
}
