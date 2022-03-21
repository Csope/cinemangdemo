import { useQuery } from 'react-query';
import axios from 'axios';
import { ResType, ReservationType } from '../types';

const getReservations = async (userId: number) => {
	const { data } = await axios.get<ResType<ReservationType[]>>(
		`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/${userId}/reservations`
	);

	return data;
};

export default function useGetReservations(userId: number) {
	return useQuery(['reservations', userId], () => getReservations(userId), {
		retry: false,
	});
}
