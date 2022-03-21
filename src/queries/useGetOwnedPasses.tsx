import { useQuery } from 'react-query';
import axios from 'axios';
import { OwnedPassType, ResType } from '../types';

const getOwnedPasses = async (userId: number) => {
	const { data } = await axios.get<ResType<OwnedPassType[]>>(
		`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/${userId}/passes`
	);

	return data;
};

export default function useGetOwnedPasses(userId: number) {
	return useQuery(['passes', userId], () => getOwnedPasses(userId), {
		retry: false,
	});
}
