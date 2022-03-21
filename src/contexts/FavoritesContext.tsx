import React, { useEffect } from 'react';
import { useReducer, createContext } from 'react';

export type FavoritesStateType = {
	favorites: string[];
};

const initState: FavoritesStateType = {
	favorites: [],
};

export type FavoritesActions =
	| { type: 'ADD'; payload: string }
	| { type: 'REMOVE'; payload: string }
	| { type: 'INIT'; payload: string[] }
	| { type: 'EMPTY' };

const FavoritesContext = createContext<{
	favoritesState: FavoritesStateType;
	favoritesDispatch: React.Dispatch<FavoritesActions>;
}>({ favoritesState: initState, favoritesDispatch: () => null });

const ClassFilterReducer = (
	state: FavoritesStateType,
	action: FavoritesActions
): FavoritesStateType => {
	switch (action.type) {
		case 'ADD':
			if (state.favorites.includes(action.payload)) return state;

			const addFavorites = [...state.favorites, action.payload];
			localStorage.setItem('favorites', JSON.stringify(addFavorites));

			return { ...state, favorites: addFavorites };

		case 'REMOVE':
			if (!state.favorites.includes(action.payload)) return state;

			const removeFavorites = state.favorites.filter(
				(favString) => favString !== action.payload
			);
			localStorage.setItem('favorites', JSON.stringify(removeFavorites));

			return { ...state, favorites: removeFavorites };

		case 'INIT':
			return { ...state, favorites: action.payload };

		case 'EMPTY':
			localStorage.removeItem('favorites');
			return { ...state, favorites: [] };

		default:
			return state;
	}
};

interface PropTypes {
	children: JSX.Element;
}

const FavoritesProvider = ({ children }: PropTypes): JSX.Element => {
	const [favoritesState, favoritesDispatch] = useReducer(
		ClassFilterReducer,
		initState
	);

	useEffect(() => {
		const _favorites = localStorage.getItem('favorites');

		if (!_favorites) return;

		favoritesDispatch({ type: 'INIT', payload: JSON.parse(_favorites) });
	}, []);

	return (
		<FavoritesContext.Provider value={{ favoritesState, favoritesDispatch }}>
			{children}
		</FavoritesContext.Provider>
	);
};

export { FavoritesContext, FavoritesProvider };
