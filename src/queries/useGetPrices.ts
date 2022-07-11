import { useQuery } from 'react-query';
import axios from 'axios';
import { PriceType } from '../types';

const getPrices = async () => {
	const {
		data: { data },
	} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/page_data/tradeables`
	);

	return data;
};

export default function useGetPrices() {
	const { isLoading, data } = useQuery('prices', getPrices, {
		retry: 3,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		cacheTime: Infinity,
	});

	return {
		data: {
			passTypes: data?.pass_types || [],
			prices: (data?.prices as PriceType[]) || [],
		},
		isLoading,
	};
}
