import { useContext } from 'react';
import { ClassesContext } from '../contexts';

export default function useClasses() {
	const { state }: any = useContext(ClassesContext);

	return { state };
}
