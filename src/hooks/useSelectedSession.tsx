import { useContext } from 'react';
import { SelectedSessionContext } from '../contexts';

const useSelectedSession = () => {
	const { selectedSessionState, selectedSessionDispatch } = useContext(
		SelectedSessionContext
	);

	return {
		selectedSessionState,
		selectedSessionDispatch,
	};
};

export default useSelectedSession;
