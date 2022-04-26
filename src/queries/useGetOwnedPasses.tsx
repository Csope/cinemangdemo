import { useQuery } from 'react-query';
import axios from 'axios';
import { OwnedPassType, ResType } from '../types';
import { useUser } from '../hooks';

const getOwnedPasses = async (userId?: number) => {
	const { data } = await axios.get<ResType<OwnedPassType[]>>(
		`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/${userId}/passes`
	);

	return data;
};

export default function useGetOwnedPasses() {
	const { user } = useUser();

	return useQuery(['passes', user?.id], () => getOwnedPasses(user?.id), {
		retry: false,
	});
}
