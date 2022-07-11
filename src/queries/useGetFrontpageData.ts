import { useQuery } from 'react-query';
import axios from 'axios';
import { FrontPageResponseType } from '../types';

const getFrontpageData = async () => {
	const {
		data: { data },
	} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/page_data/frontpage`
	);

	return data;
};

export default function useGetFrontpageData() {
	const { isLoading, data } = useQuery('frontpage', getFrontpageData, {
		retry: 3,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		cacheTime: Infinity,
	});

	return {
		data: {
			frontpage: data?.frontpage as FrontPageResponseType,
		},
		isLoading,
	};
}
