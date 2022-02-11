import React, { useContext } from 'react';
import { ClassFilterContext } from '../contexts';

export default function useClassFilter() {
	const { classFilterState, classFilterDispatch } =
		useContext(ClassFilterContext);

	return {
		classFilterState,
		classFilterDispatch,
	};
}
