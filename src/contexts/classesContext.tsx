import { useReducer, createContext } from 'react';

const initState = {};

const ClassesContext = createContext(initState);

const ClassesReducer = () => {
	// switch (action.type) {
	// 	case 'SET_TEST':
	// 		return { ...state, test: action.payload };
	// 	default:
	// 		return state;
	// }
};

const ClassesProvider = () => {
	// const [state, dispatch] = useReducer(ClassesReducer, initState);
	// return (
	// 	<ClassesContext.Provider
	// 		value={{
	// 			state,
	// 			dispatch,
	// 		}}
	// 	>
	// 		{children}
	// 	</ClassesContext.Provider>
	// );
};

export { ClassesContext, ClassesProvider };
