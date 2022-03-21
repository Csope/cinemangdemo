import { useQuery } from 'react-query';
import axios from 'axios';
import { ResType, PassType } from '../types';

const getTickets = async () => {
	const { data } = await axios.get<ResType<PassType[]>>(
		`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/pass_types`
	);

	return data;
};

export default function useGetTickets() {
	return useQuery('tickets', getTickets, {
		retry: false,
	});
}
