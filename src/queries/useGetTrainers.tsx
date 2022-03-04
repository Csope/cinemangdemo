import { useQuery } from 'react-query';
import axios from 'axios';
import { ResType, TrainerType } from '../types';

const getTrainers = async () => {
	const { data } = await axios.get<ResType<TrainerType[]>>(
		`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/trainers`
	);

	return data;
};

export default function useGetTrainers() {
	return useQuery('trainers', getTrainers, {
		retry: false,
	});
}
