import { useQuery } from 'react-query';
import axios from 'axios';
import { EventType } from '../types';

const getEvents = async () => {
	const {
		data: { data },
	} = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/events`);

	return data;
};

export default function useGetEvents() {
	const { isLoading, data } = useQuery('events', getEvents, {
		retry: 3,
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnWindowFocus: false,
	});

	return {
		data: {
			events: (data?.events as EventType[]) || [],
		},
		isLoading,
	};
}
