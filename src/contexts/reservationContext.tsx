// import { useReducer, createContext } from 'react';

// const initState = {};

// const ReservationContext = createContext(initState);

// const ReservationReducer = (state, action) => {
// 	switch (action.type) {
// 		case 'SET_TEST':
// 			return { ...state, test: action.payload };

// 		default:
// 			return state;
// 	}
// };

// const ReservationProvider = ({ children }) => {
// 	const [reservationState, reservationDispatch] = useReducer(
// 		ReservationReducer,
// 		initState
// 	);

// 	const setShowtimeShowFilm = (data) => {
// 		reservationDispatch({
// 			type: 'SET_SHOWTIME_SHOW_FILM',
// 			payload: data,
// 		});
// 	};

// 	return (
// 		<ReservationContext.Provider
// 			value={{
// 				reservationState,
// 			}}
// 		>
// 			{children}
// 		</ReservationContext.Provider>
// 	);
// };

// export { ReservationContext, ReservationProvider };
